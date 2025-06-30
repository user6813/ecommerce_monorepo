import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({ example: 'admin', required: false })
  name?: string;

  @ApiProperty({ example: [1, 2], required: false, description: 'Permission IDs' })
  permissions?: number[];
} 