import {
  RecipeTag,
  Tag,
  Recipe,
  Author,
  RecipeIngredient,
  Ingredient,
} from 'src/generated/prisma/client';

export type RecipeTagDetails = RecipeTag & { tag: Tag };
export type RecipeIngredientDetails = RecipeIngredient & { ingredient: Ingredient };
export type RecipePreview = Recipe & {
  recipeTags: Array<RecipeTagDetails>;
};
export type RecipeFindManyResult = {
  data: RecipePreview[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
export type RecipeDetails = Recipe & {
  author: Author;
  recipeTags: Array<RecipeTagDetails>;
  recipeIngredients: Array<RecipeIngredientDetails>;
};
