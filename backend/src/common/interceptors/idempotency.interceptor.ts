import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { Response } from 'express';
import { randomUUID } from 'crypto';

interface IdempotencyResponse {
  statusCode: number;
  body: any;
  headers?: Record<string, string>;
}

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  private readonly logger = new Logger(IdempotencyInterceptor.name);
  private readonly EXPIRE_TIME = 3600; // 1 hour in seconds

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();

    // Only handle POST requests
    if (request.method !== 'POST') {
      return next.handle();
    }

    let idempotencyKey = request.headers['idempotency-key'] as string;

    // Auto-generate idempotency key if not provided
    if (!idempotencyKey) {
      idempotencyKey = this.generateIdempotencyKey();
      this.logger.log(`Auto-generated idempotency key: ${idempotencyKey}`);
    } else {
      // Validate UUID format if provided manually
      if (!this.isValidUUID(idempotencyKey)) {
        throw new BadRequestException('Idempotency-Key must be a valid UUID');
      }
    }

    const redisKey = `idem:${idempotencyKey}`;

    try {
      // Check if response exists in Redis
      const cachedResponse = await this.redis.get(redisKey);
      
      if (cachedResponse) {
        this.logger.log(`Idempotent response reused for key: ${idempotencyKey}`);
        
        const parsedResponse: IdempotencyResponse = JSON.parse(cachedResponse);
        
        // Set response status and headers
        response.status(parsedResponse.statusCode);
        
        if (parsedResponse.headers) {
          Object.entries(parsedResponse.headers).forEach(([key, value]) => {
            response.setHeader(key, value);
          });
        }
        
        // Return the cached response
        return of(parsedResponse.body);
      }

      // If no cached response, process the request and cache the response
      return next.handle().pipe(
        tap(async (data) => {
          try {
            const responseData: IdempotencyResponse = {
              statusCode: response.statusCode,
              body: data,
              headers: this.extractHeaders(response),
            };

            await this.cacheResponse(redisKey, responseData);
          } catch (error) {
            this.logger.error(`Failed to cache idempotent response: ${error.message}`);
          }
        }),
      );
    } catch (error) {
      this.logger.error(`Error in idempotency interceptor: ${error.message}`);
      throw error;
    }
  }

  private async cacheResponse(key: string, response: IdempotencyResponse): Promise<void> {
    try {
      const serializedResponse = JSON.stringify(response);
      await this.redis.setex(key, this.EXPIRE_TIME, serializedResponse);
      this.logger.log(`Cached idempotent response for key: ${key}`);
    } catch (error) {
      this.logger.error(`Failed to cache idempotent response: ${error.message}`);
    }
  }

  private extractHeaders(response: Response): Record<string, string> {
    const headers: Record<string, string> = {};
    const responseHeaders = response.getHeaders();
    
    Object.keys(responseHeaders).forEach(key => {
      const value = responseHeaders[key];
      if (value && typeof value === 'string') {
        headers[key] = value;
      }
    });

    return headers;
  }

  private generateIdempotencyKey(): string {
    return randomUUID();
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
} 