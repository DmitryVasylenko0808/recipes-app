import { FavoriteRecipe } from 'src/generated/prisma/client';
import { RecipeFindManyItem } from 'src/recipes/recipes.types';

export type Favorite = FavoriteRecipe & { recipe: RecipeFindManyItem };
export type FindManyFavoritesResult = {
  data: Favorite[];
  totalCount: number;
};
