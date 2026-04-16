import {
  RecipeTag,
  Tag,
  Recipe,
  Author,
  RecipeIngredient,
  Ingredient,
  Category,
} from 'src/generated/prisma/client';

export type RecipeTagDetails = RecipeTag & { tag: Tag };
export type RecipeIngredientDetails = RecipeIngredient & { ingredient: Ingredient };
export type FavoriteEntryItem = { userId: string };
export type RecipePreview = Recipe & {
  category: Category;
  favoriteEntries?: FavoriteEntryItem[];
  recipeTags: Array<RecipeTagDetails>;
  recipeIngredients: Array<RecipeIngredientDetails>;
};

export type RecipeFindManyResult = {
  data: RecipePreview[];
  totalCount: number;
};

export type RecipeDetails = Recipe & {
  category: Category;
  author: Author;
  favoriteEntries?: FavoriteEntryItem[];
  recipeTags: Array<RecipeTagDetails>;
  recipeIngredients: Array<RecipeIngredientDetails>;
};
