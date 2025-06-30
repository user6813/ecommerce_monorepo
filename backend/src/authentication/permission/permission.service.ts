import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find({ relations: ['roles'] });
  }

  async findById(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({ where: { id }, relations: ['roles'] });
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async create(data: Partial<Permission>): Promise<Permission> {
    const permission = this.permissionRepository.create(data);
    return this.permissionRepository.save(permission);
  }

  async update(id: number, data: Partial<Permission>): Promise<Permission> {
    await this.findById(id);
    await this.permissionRepository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.permissionRepository.delete(id);
  }
} 