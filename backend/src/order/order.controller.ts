import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderResponseDto } from './order.types';
import { OrderModel } from './order.model';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders', description: 'Retrieve a list of all orders' })
  @ApiResponse({ status: 200, description: 'List of orders retrieved successfully', type: [OrderResponseDto] })
  async findAll(): Promise<OrderModel[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID', description: 'Retrieve a specific order by its ID' })
  @ApiParam({ name: 'id', description: 'Order ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<OrderModel> {
    return this.orderService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order', description: 'Create a new order with the provided data' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created successfully', type: OrderResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request - invalid data or product not found' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderModel> {
    return this.orderService.create(createOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order', description: 'Update an existing order by its ID' })
  @ApiParam({ name: 'id', description: 'Order ID', example: 1 })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 200, description: 'Order updated successfully', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Bad request - invalid data or product not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: CreateOrderDto): Promise<OrderModel> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an order', description: 'Delete an order by its ID' })
  @ApiParam({ name: 'id', description: 'Order ID', example: 1 })
  @ApiResponse({ status: 204, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.orderService.delete(id);
  }
} 