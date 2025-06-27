import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Inventory Management API')
    .setDescription('A comprehensive API for managing inventory with categories and products')
    .setVersion('1.0')
    .addTag('categories', 'Operations related to product categories')
    .addTag('products', 'Operations related to products')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
} 