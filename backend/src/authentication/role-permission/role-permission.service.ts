import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async findAll(): Promise<RolePermission[]> {
    return this.rolePermissionRepository.find();
  }

  async findById(id: number): Promise<RolePermission> {
    const rp = await this.rolePermissionRepository.findOne({ where: { id } });
    if (!rp) throw new NotFoundException('RolePermission not found');
    return rp;
  }

  async create(data: Partial<RolePermission>): Promise<RolePermission> {
    const rp = this.rolePermissionRepository.create(data);
    return this.rolePermissionRepository.save(rp);
  }

  async update(id: number, data: Partial<RolePermission>): Promise<RolePermission> {
    await this.findById(id);
    await this.rolePermissionRepository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.rolePermissionRepository.delete(id);
  }
} 