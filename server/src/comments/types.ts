import { Prisma } from 'src/generated/prisma/client';
import { CommentDefaultArgs } from 'src/generated/prisma/models';

const commentListQuery = {
  include: { user: true, likes: true },
} satisfies CommentDefaultArgs;
export type CommentListItem = Prisma.CommentGetPayload<typeof commentListQuery>;

export type CommentList = {
  data: CommentListItem[];
  totalCount: number;
};

export const SortCommentsPreset = {
  NEWEST: 'newest',
  POPULAR: 'popular',
} as const;
export type SortCommentsPreset = (typeof SortCommentsPreset)[keyof typeof SortCommentsPreset];
