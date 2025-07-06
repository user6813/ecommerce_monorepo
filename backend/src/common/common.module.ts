import { Module, Global } from '@nestjs/common';
import { IdempotencyInterceptor } from './interceptors/idempotency.interceptor';

@Global()
@Module({
  providers: [IdempotencyInterceptor],
  exports: [IdempotencyInterceptor],
})
export class CommonModule {} 