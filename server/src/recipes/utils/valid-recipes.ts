import { RecipeListItem, RecipeFullSafe } from '../recipes.types';

export const validRecipes = (recipes: RecipeListItem[]) => {
  return recipes.filter((r): r is RecipeFullSafe => r.currentVersion !== null);
};
