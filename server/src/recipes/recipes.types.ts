import { Recipe, Prisma } from 'src/generated/prisma/client';
import {
  RecipeDefaultArgs,
  RecipeIngredientDefaultArgs,
  RecipeTagDefaultArgs,
} from 'src/generated/prisma/models';

export type RangeDate = { from: Date; to: Date };

const recipeTagDetailsQuery = {
  include: { tag: true },
} satisfies RecipeTagDefaultArgs;
export type RecipeTagDetails = Prisma.RecipeTagGetPayload<typeof recipeTagDetailsQuery>;

const recipeIngredientDetailsQuery = {
  include: { ingredient: true },
} satisfies RecipeIngredientDefaultArgs;
export type RecipeIngredientDetails = Prisma.RecipeIngredientGetPayload<
  typeof recipeIngredientDetailsQuery
>;

const recipeListQuery = {
  include: {
    category: true,
    favoriteEntries: true,
    recipeTags: {
      include: { tag: true },
    },
    recipeIngredients: {
      include: { ingredient: true },
    },
  },
} satisfies RecipeDefaultArgs;
export type RecipeListItem = Prisma.RecipeGetPayload<typeof recipeListQuery>;
export type RecipeList = { data: RecipeListItem[]; totalCount: number };

const recipeFullQuery = {
  include: {
    category: true,
    author: true,
    favoriteEntries: true,
    ratings: true,
    recipeTags: {
      include: { tag: true },
    },
    recipeIngredients: {
      include: { ingredient: true },
    },
  },
} satisfies RecipeDefaultArgs;
export type RecipeFull = Prisma.RecipeGetPayload<typeof recipeFullQuery>;

export type RateStats = Pick<Recipe, 'ratingsCount' | 'ratingsSum' | 'ratingsAvg'>;
