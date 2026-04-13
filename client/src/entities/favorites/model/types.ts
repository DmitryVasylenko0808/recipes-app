import type { RecipePreview } from '@/entities/recipes';

export type FavoriteRecipe = {
  id: string;
  userId: string;
  recipeId: string;
  favoritedAt: Date;
};

export type FavoriteRecipeDetails = FavoriteRecipe & {
  recipe: RecipePreview;
};
