import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Setup Swagger
  setupSwagger(app);
  
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
    console.log(`Swagger documentation available at: http://localhost:${process.env.PORT ?? 3000}/api-docs`);
  });
}
bootstrap();
