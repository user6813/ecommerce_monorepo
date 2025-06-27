import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductModel } from './product.model';
import { Product, CreateProductDto, UpdateProductDto } from './product.types';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<ProductModel[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  async findById(id: number): Promise<ProductModel> {
    const product = await this.productRepository.findOne({ 
      where: { id },
      relations: ['category']
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findByCategoryId(categoryId: number): Promise<ProductModel[]> {
    // Validate that the category exists
    await this.categoryService.findById(categoryId);
    return this.productRepository.find({ 
      where: { categoryId },
      relations: ['category']
    });
  }

  async create(createProductDto: CreateProductDto): Promise<ProductModel> {
    // Validate that the category exists
    try {
      await this.categoryService.findById(createProductDto.categoryId);
    } catch (error) {
      throw new BadRequestException(`Category with ID ${createProductDto.categoryId} not found`);
    }

    // Validate price and stock
    if (createProductDto.price < 0) {
      throw new BadRequestException('Price cannot be negative');
    }

    if (createProductDto.stock < 0) {
      throw new BadRequestException('Stock cannot be negative');
    }

    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductModel> {
    // Validate that the product exists
    await this.findById(id);

    // If categoryId is being updated, validate it exists
    if (updateProductDto.categoryId) {
      try {
        await this.categoryService.findById(updateProductDto.categoryId);
      } catch (error) {
        throw new BadRequestException(`Category with ID ${updateProductDto.categoryId} not found`);
      }
    }

    // Validate price and stock if provided
    if (updateProductDto.price !== undefined && updateProductDto.price < 0) {
      throw new BadRequestException('Price cannot be negative');
    }

    if (updateProductDto.stock !== undefined && updateProductDto.stock < 0) {
      throw new BadRequestException('Stock cannot be negative');
    }

    await this.productRepository.update(id, updateProductDto);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
} 