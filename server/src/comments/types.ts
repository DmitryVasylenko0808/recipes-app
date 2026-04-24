import { Prisma } from 'src/generated/prisma/client';
import { CommentDefaultArgs } from 'src/generated/prisma/models';

const commentListQuery = {
  include: { user: true },
} satisfies CommentDefaultArgs;
export type CommentListItem = Prisma.CommentGetPayload<typeof commentListQuery>;

export type CommentList = {
  data: CommentListItem[];
  totalCount: number;
};
