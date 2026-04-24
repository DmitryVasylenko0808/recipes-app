import { Prisma } from 'src/generated/prisma/client';

const favoriteListQuery = {
  include: {
    recipe: {
      include: {
        category: true,
        recipeIngredients: {
          include: { ingredient: true },
        },
        recipeTags: {
          include: { tag: true },
        },
      },
    },
  },
} satisfies Prisma.FavoriteRecipeDefaultArgs;
export type FavoriteListItem = Prisma.FavoriteRecipeGetPayload<typeof favoriteListQuery>;

export type FavoriteList = {
  data: FavoriteListItem[];
  totalCount: number;
};
