import { Button } from '@/shared';
import { ThumbsUp } from 'lucide-react';
import { useToggleCommentLike } from '../model/hooks/use-toggle-comment-like';
import type { CommentLike } from '../model/types';
import type { Comment } from '@/entities/comments';

type ToggleLikeCommentButtonProps = {
  comment: Comment;
  onSuccess?: (data?: CommentLike) => void;
  onError?: (err?: Error) => void;
};

export const ToggleLikeCommentButton = ({
  comment,
  onSuccess,
  onError,
}: ToggleLikeCommentButtonProps) => {
  const { mutateAsync, isPending } = useToggleCommentLike();

  const handleClick = () => {
    mutateAsync(comment).then(onSuccess).catch(onError);
  };

  return (
    <Button
      as="button"
      variant={comment.isLiked ? 'primary' : 'text'}
      size="sm"
      icon={ThumbsUp}
      disabled={isPending}
      onClick={handleClick}
    >
      {comment.likesCount ? comment.likesCount : 'Like'}
    </Button>
  );
};
