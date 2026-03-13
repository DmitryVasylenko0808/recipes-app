import { Ingredient } from 'src/generated/prisma/client';

export interface IIngredientsRepository {
  findMany(): Promise<Ingredient[]>;
}
