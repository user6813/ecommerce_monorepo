import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryModel } from '../category/category.model';

@Entity('products')
export class ProductModel {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => CategoryModel, (category) => category.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' })
  category: CategoryModel;
} 