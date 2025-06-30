import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderModel, OrderDetailModel } from './order.model';
import { CreateOrderDto, CreateOrderDetailDto } from './order.types';
import { ProductService } from '../inventory/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderModel)
    private readonly orderRepository: Repository<OrderModel>,
    @InjectRepository(OrderDetailModel)
    private readonly orderDetailRepository: Repository<OrderDetailModel>,
    private readonly productService: ProductService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderModel> {
    if (!createOrderDto.orderDetails || createOrderDto.orderDetails.length === 0) {
      throw new BadRequestException('Order must have at least one product.');
    }

    // Validate all products exist
    for (const detail of createOrderDto.orderDetails) {
      const product = await this.productService.findById(detail.productId);
      if (!product) {
        throw new BadRequestException(`Product with ID ${detail.productId} not found.`);
      }
    }

    const order = this.orderRepository.create({
      userId: createOrderDto.userId,
      orderDetails: createOrderDto.orderDetails.map((detail) => this.orderDetailRepository.create(detail)),
    });
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<OrderModel[]> {
    return this.orderRepository.find({ relations: ['orderDetails'] });
  }

  async findById(id: number): Promise<OrderModel> {
    const order = await this.orderRepository.findOne({ where: { id }, relations: ['orderDetails'] });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: Partial<CreateOrderDto>): Promise<OrderModel> {
    const order = await this.findById(id);
    if (updateOrderDto.orderDetails && updateOrderDto.orderDetails.length === 0) {
      throw new BadRequestException('Order must have at least one product.');
    }
    if (updateOrderDto.orderDetails) {
      // Validate all products exist
      for (const detail of updateOrderDto.orderDetails) {
        const product = await this.productService.findById(detail.productId);
        if (!product) {
          throw new BadRequestException(`Product with ID ${detail.productId} not found.`);
        }
      }
      order.orderDetails = updateOrderDto.orderDetails.map((detail) => this.orderDetailRepository.create(detail));
    }
    if (updateOrderDto.userId) {
      order.userId = updateOrderDto.userId;
    }
    return this.orderRepository.save(order);
  }

  async delete(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
  }
} 