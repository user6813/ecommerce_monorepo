import { Permission } from '../../permission/permission.entity';
import { User } from '../../../user/user.entity';

export interface IRole {
  id: number;
  name: string;
  users: User[];
  permissions: Permission[];
} 