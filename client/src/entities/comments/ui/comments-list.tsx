import { cn } from '@/shared/lib/utils/cn';
import type { Comment } from '../model/types/comment';
import type { ReactNode } from 'react';

type CommentsListProps = {
  comments?: Comment[];
  isFetching?: boolean;
  renderItem: (item: Comment) => ReactNode;
};

export const CommentsList = ({ comments = [], isFetching, renderItem }: CommentsListProps) => {
  return (
    <div
      className={cn('space-y-4', {
        'opacity-50': isFetching,
      })}
    >
      {comments.map((c) => renderItem(c))}
    </div>
  );
};
