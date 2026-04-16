import { FavoriteRecipe } from 'src/generated/prisma/client';
import { RecipePreview } from 'src/recipes/recipes.types';

export type Favorite = FavoriteRecipe & { recipe: RecipePreview };
export type FindManyFavoritesResult = {
  data: Favorite[];
  totalCount: number;
};
