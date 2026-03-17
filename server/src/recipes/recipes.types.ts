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
export type RecipePreview = Recipe & {
  category: Category;
  recipeTags: Array<RecipeTagDetails>;
  recipeIngredients: Array<RecipeIngredientDetails>;
};

export type RecipeFindManyResult = {
  data: RecipePreview[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export type RecipeDetails = Recipe & {
  category: Category;
  author: Author;
  recipeTags: Array<RecipeTagDetails>;
  recipeIngredients: Array<RecipeIngredientDetails>;
};
