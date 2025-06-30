import { Role } from '../../role/role.entity';

export interface IPermission {
  id: number;
  name: string;
  roles: Role[];
} 