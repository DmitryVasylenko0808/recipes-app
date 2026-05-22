import type { RecipeVersionPreview } from './recipe-version-preview';
import type { Recipe } from './recipe';

export type RecipeVersion = {
  version: Omit<RecipeVersionPreview, 'isCurrent'>;
  recipe: Omit<
    Recipe,
    | 'author'
    | 'authorId'
    | 'isFavorite'
    | 'id'
    | 'ratingsAvg'
    | 'ratingsCount'
    | 'userRating'
    | 'viewsCount'
    | 'createdAt'
  >;
};
