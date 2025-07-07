import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger.config';
import { IdempotencyInterceptor } from './common/interceptors/idempotency.interceptor';
import { monitoringMiddleware, getMetrics } from '../infra/monitoring/standalone-monitoring';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Apply monitoring middleware
  app.use(monitoringMiddleware);
  
  // Apply idempotency interceptor globally
  const idempotencyInterceptor = app.get(IdempotencyInterceptor);
  app.useGlobalInterceptors(idempotencyInterceptor);
  
  // Setup Swagger
  setupSwagger(app);
  
  // Add metrics endpoint
  app.use('/monitoring/metrics', async (req, res) => {
    const metrics = await getMetrics();
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  });
  
  // Add health check endpoint
  app.use('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });
  
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
    console.log(`Swagger documentation available at: http://localhost:${process.env.PORT ?? 3000}/api-docs`);
    console.log(`Metrics endpoint available at: http://localhost:${process.env.PORT ?? 3000}/monitoring/metrics`);
    console.log(`Health check available at: http://localhost:${process.env.PORT ?? 3000}/health`);
  });
}
bootstrap();
