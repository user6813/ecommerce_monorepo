import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin' })
  name: string;

  @ApiProperty({ example: [1, 2], required: false, description: 'Permission IDs' })
  permissions?: number[];
} 