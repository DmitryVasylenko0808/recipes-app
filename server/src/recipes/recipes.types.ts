import { Recipe, Prisma, Difficulty } from 'src/generated/prisma/client';
import {
  RecipeDefaultArgs,
  RecipeIngredientDefaultArgs,
  RecipeTagDefaultArgs,
} from 'src/generated/prisma/models';
import { RecipeIngredientDto } from './dtos';

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
    currentVersion: {
      include: {
        category: true,
        recipeTags: {
          include: { tag: true },
        },
        recipeIngredients: {
          include: { ingredient: true },
        },
      },
    },
    favoriteEntries: true,
  },
} satisfies RecipeDefaultArgs;
export type RecipeListItem = Prisma.RecipeGetPayload<typeof recipeListQuery>;
export type RecipeList = { data: RecipeListItem[]; totalCount: number };

const recipeFullQuery = {
  include: {
    currentVersion: {
      include: {
        category: true,
        recipeSteps: true,
        recipeTags: {
          include: { tag: true },
        },
        recipeIngredients: {
          include: { ingredient: true },
        },
      },
    },
    author: true,
    favoriteEntries: true,
    ratings: true,
  },
} satisfies RecipeDefaultArgs;
export type RecipeFull = Prisma.RecipeGetPayload<typeof recipeFullQuery>;

export type RateStats = Pick<Recipe, 'ratingsCount' | 'ratingsSum' | 'ratingsAvg'>;

export type AddVersionData = {
  readonly title: string;
  readonly categoryId: string;
  readonly description: string;
  readonly cookingTime: number;
  readonly difficulty: Difficulty;
  readonly previewImageFilename: string;
  readonly recipeSteps: string[];
  readonly recipeTagIds: string[];
  readonly recipeIngredients: RecipeIngredientDto[];
};

export type RecipeListItemSafe = RecipeListItem & {
  currentVersion: NonNullable<RecipeListItem['currentVersion']>;
};
export type RecipeFullSafe = RecipeFull & {
  currentVersion: NonNullable<RecipeFull['currentVersion']>;
};

const r: RecipeListItemSafe = {} as RecipeListItemSafe;
