import { Purchase } from '../../purchase/model/purchase';
import { Address } from './address';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  image?: string;
  roles?: Role[];
  address?: Address;
  purchases?: Purchase[];
}

interface Role {
  id:number,
  name:string
}
