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

export type RecipeFindManyItem = Recipe & {
  category: Category;
  favoriteEntries?: FavoriteEntryItem[];
  recipeTags: Array<RecipeTagDetails>;
  recipeIngredients: Array<RecipeIngredientDetails>;
};
export type RecipeFindManyResult = {
  data: RecipeFindManyItem[];
  totalCount: number;
};

export type RecipeFindOneResult = Recipe & {
  category: Category;
  author: Author;
  favoriteEntries?: FavoriteEntryItem[];
  recipeTags: Array<RecipeTagDetails>;
  recipeIngredients: Array<RecipeIngredientDetails>;
};

export type RecipePreview = {
  category: Category;
  isFavorite?: boolean;
  recipeTags: Array<RecipeTagDetails>;
  recipeIngredients: Array<RecipeIngredientDetails>;
};

export type RecipeDetails = Recipe & {
  category: Category;
  author: Author;
  isFavorite?: boolean;
  recipeTags: Array<RecipeTagDetails>;
  recipeIngredients: Array<RecipeIngredientDetails>;
};
