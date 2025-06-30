import { Role } from '../../authentication/role/role.entity';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: Role[];
} 