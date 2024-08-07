import { Product } from "../../product/model/product";

export interface PurchaseItem {
  id?: number;
  product: Product;
  quantity: number;
}
