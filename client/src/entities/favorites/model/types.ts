import type { RecipePreview } from '@/entities/recipes';

export type FavoriteRecipeDetails = {
  id: string;
  userId: string;
  recipeId: string;
  favoritedAt: string;
  recipe: RecipePreview;
};
