import { ApiProperty } from '@nestjs/swagger';

export class CreateRolePermissionDto {
  @ApiProperty({ example: 1 })
  roleId: number;

  @ApiProperty({ example: 2 })
  permissionId: number;
} 