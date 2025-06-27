import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category, CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto } from './category.types';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories', description: 'Retrieve a list of all categories with their products' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of categories retrieved successfully',
    type: [CategoryResponseDto]
  })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID', description: 'Retrieve a specific category by its ID' })
  @ApiParam({ name: 'id', description: 'Category ID', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Category retrieved successfully',
    type: CategoryResponseDto
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new category', description: 'Create a new category with the provided data' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Category created successfully',
    type: CategoryResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid data' })
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category', description: 'Update an existing category by its ID' })
  @ApiParam({ name: 'id', description: 'Category ID', example: 1 })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Category updated successfully',
    type: CategoryResponseDto
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 400, description: 'Bad request - invalid data' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a category', description: 'Delete a category by its ID' })
  @ApiParam({ name: 'id', description: 'Category ID', example: 1 })
  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoryService.delete(id);
  }
} 