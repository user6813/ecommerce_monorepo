import { ApiProperty } from '@nestjs/swagger';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number;
}

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'iPhone 15',
    minLength: 1,
    maxLength: 200,
  })
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
    minimum: 0,
  })
  price: number;

  @ApiProperty({
    description: 'The ID of the category this product belongs to',
    example: 1,
  })
  categoryId: number;

  @ApiProperty({
    description: 'The current stock quantity of the product',
    example: 50,
    minimum: 0,
    default: 0,
  })
  stock: number;
}

export class UpdateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'iPhone 15',
    required: false,
    minLength: 1,
    maxLength: 200,
  })
  name?: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
    required: false,
    minimum: 0,
  })
  price?: number;

  @ApiProperty({
    description: 'The ID of the category this product belongs to',
    example: 1,
    required: false,
  })
  categoryId?: number;

  @ApiProperty({
    description: 'The current stock quantity of the product',
    example: 50,
    required: false,
    minimum: 0,
  })
  stock?: number;
}

export class ProductResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the product',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the product',
    example: 'iPhone 15',
  })
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  price: number;

  @ApiProperty({
    description: 'The current stock quantity of the product',
    example: 50,
  })
  stock: number;

  @ApiProperty({
    description: 'The ID of the category this product belongs to',
    example: 1,
  })
  categoryId: number;
} 