import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product, CreateProductDto, UpdateProductDto, ProductResponseDto } from './product.types';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products', description: 'Retrieve a list of all products or filter by category' })
  @ApiQuery({ 
    name: 'categoryId', 
    description: 'Filter products by category ID', 
    required: false, 
    example: 1 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of products retrieved successfully',
    type: [ProductResponseDto]
  })
  async findAll(@Query('categoryId') categoryId?: string): Promise<Product[]> {
    if (categoryId) {
      return this.productService.findByCategoryId(parseInt(categoryId, 10));
    }
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID', description: 'Retrieve a specific product by its ID' })
  @ApiParam({ name: 'id', description: 'Product ID', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Product retrieved successfully',
    type: ProductResponseDto
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product', description: 'Create a new product with the provided data' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Product created successfully',
    type: ProductResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid data or category not found' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product', description: 'Update an existing product by its ID' })
  @ApiParam({ name: 'id', description: 'Product ID', example: 1 })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Product updated successfully',
    type: ProductResponseDto
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Bad request - invalid data or category not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product', description: 'Delete a product by its ID' })
  @ApiParam({ name: 'id', description: 'Product ID', example: 1 })
  @ApiResponse({ status: 204, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.delete(id);
  }
} 