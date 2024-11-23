import type { Category } from './Category';
export interface ProductType {
  _id: string;
  ProductID: number;
  ProductName: string;
  Category: Category;
  Price: number;
  sold: number;
}