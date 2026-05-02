import type { AuthorPreview } from '@/entities/authors/model/types/author-preview';

export type Comment = {
  id: string;
  userId: string;
  user: AuthorPreview;
  recipeId: string;
  content: string;
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
  isLiked?: boolean;
};
