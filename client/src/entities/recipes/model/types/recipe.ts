import type { RecipePreview } from './recipe-preview';
import type { AuthorPreview } from '@/entities/authors/model/types/author-preview';

export type Recipe = RecipePreview & {
  authorId: string;
  author: AuthorPreview;
  userRating?: number;
  recipeSteps: string[];
};
