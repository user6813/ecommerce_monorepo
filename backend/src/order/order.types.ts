import { ApiProperty } from '@nestjs/swagger';

export interface Order {
  id: number;
  userId: number;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
}

export class CreateOrderDetailDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  productId: number;

  @ApiProperty({ description: 'Quantity of the product', example: 2, minimum: 1 })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  userId: number;

  @ApiProperty({
    description: 'Order details (products in the order)',
    type: [CreateOrderDetailDto],
    minItems: 1,
  })
  orderDetails: CreateOrderDetailDto[];
}

export class OrderResponseDto {
  @ApiProperty({ description: 'Order ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  userId: number;

  @ApiProperty({ description: 'Order details', type: [CreateOrderDetailDto] })
  orderDetails: CreateOrderDetailDto[];
} 