import { ApiProperty } from '@nestjs/swagger';

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
    minLength: 1,
    maxLength: 100,
  })
  name: string;

  @ApiProperty({
    description: 'Optional description of the category',
    example: 'Electronic devices and accessories',
    required: false,
    maxLength: 500,
  })
  description?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
    required: false,
    minLength: 1,
    maxLength: 100,
  })
  name?: string;

  @ApiProperty({
    description: 'Optional description of the category',
    example: 'Electronic devices and accessories',
    required: false,
    maxLength: 500,
  })
  description?: string;
}

export class CategoryResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the category',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  name: string;

  @ApiProperty({
    description: 'Optional description of the category',
    example: 'Electronic devices and accessories',
    required: false,
  })
  description?: string;
} 