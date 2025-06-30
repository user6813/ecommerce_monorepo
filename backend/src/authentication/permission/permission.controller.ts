import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, description: 'List of permissions', type: [Permission] })
  async findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get permission by ID' })
  @ApiParam({ name: 'id', description: 'Permission ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Permission found', type: Permission })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Permission> {
    return this.permissionService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiBody({ type: Permission })
  @ApiResponse({ status: 201, description: 'Permission created', type: Permission })
  async create(@Body() data: Partial<Permission>): Promise<Permission> {
    return this.permissionService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a permission' })
  @ApiParam({ name: 'id', description: 'Permission ID', example: 1 })
  @ApiBody({ type: Permission })
  @ApiResponse({ status: 200, description: 'Permission updated', type: Permission })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Permission>): Promise<Permission> {
    return this.permissionService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a permission' })
  @ApiParam({ name: 'id', description: 'Permission ID', example: 1 })
  @ApiResponse({ status: 204, description: 'Permission deleted' })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.permissionService.delete(id);
  }
} 