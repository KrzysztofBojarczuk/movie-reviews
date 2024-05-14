import { Category } from '../enums/category';

export interface Movie {
  id: number;
  title: string;
  category: Category;
  releasetime: Date;
}
