import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'List of roles', type: [Role] })
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiParam({ name: 'id', description: 'Role ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Role found', type: Role })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiBody({ type: Role })
  @ApiResponse({ status: 201, description: 'Role created', type: Role })
  async create(@Body() data: Partial<Role>): Promise<Role> {
    return this.roleService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a role' })
  @ApiParam({ name: 'id', description: 'Role ID', example: 1 })
  @ApiBody({ type: Role })
  @ApiResponse({ status: 200, description: 'Role updated', type: Role })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Role>): Promise<Role> {
    return this.roleService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a role' })
  @ApiParam({ name: 'id', description: 'Role ID', example: 1 })
  @ApiResponse({ status: 204, description: 'Role deleted' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.roleService.delete(id);
  }
} 