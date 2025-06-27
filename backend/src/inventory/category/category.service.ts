import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryModel } from './category.model';
import { Category as CategoryType, CreateCategoryDto, UpdateCategoryDto } from './category.types';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>,
  ) {}

  async findAll(): Promise<CategoryModel[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  async findById(id: number): Promise<CategoryModel> {
    const category = await this.categoryRepository.findOne({ 
      where: { id },
      relations: ['products']
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryModel> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryModel> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
} 