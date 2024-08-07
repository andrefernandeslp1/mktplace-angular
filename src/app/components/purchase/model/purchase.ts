import { PurchaseItem } from './purchase-item';
import { User } from '../../user/model/user';

export interface Purchase {
  id?: number;
  userId: number;
  items: PurchaseItem[];
}
