import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { ProductModel } from '../product/product.model';

@Entity('categories')
@Unique(['name'])
export class CategoryModel   {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => ProductModel, (product: ProductModel) => product.category)
  products: ProductModel[];
} 