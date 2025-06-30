import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'john_doe', required: false })
  username?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  email?: string;

  @ApiProperty({ example: 'password123', required: false })
  password?: string;

  @ApiProperty({ example: [1, 2], required: false, description: 'Role IDs' })
  roles?: number[];
} 