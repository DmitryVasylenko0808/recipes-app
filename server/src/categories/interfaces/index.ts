import { Category } from 'src/generated/prisma/client';

export interface ICategoriesRepository {
  findMany(): Promise<Category[]>;
}
