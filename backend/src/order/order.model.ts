import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ProductModel } from '../inventory/product/product.model';

@Entity('orders')
export class OrderModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @OneToMany(() => OrderDetailModel, (orderDetail) => orderDetail.order, { cascade: true, eager: true })
  orderDetails: OrderDetailModel[];
}

@Entity('order_details')
export class OrderDetailModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  orderId: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @ManyToOne(() => OrderModel, (order) => order.orderDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: OrderModel;

  @ManyToOne(() => ProductModel, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: ProductModel;
} 