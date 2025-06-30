import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto {
  @ApiProperty({ example: 'read_users', required: false })
  name?: string;
} 