import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolePermissionDto {
  @ApiProperty({ example: 1, required: false })
  roleId?: number;

  @ApiProperty({ example: 2, required: false })
  permissionId?: number;
} 