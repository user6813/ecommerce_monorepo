import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModel, OrderDetailModel } from './order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from '../inventory/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderModel, OrderDetailModel]), ProductModule],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {} 