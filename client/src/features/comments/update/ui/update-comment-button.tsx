import type { Comment, CommentDto } from '@/entities/comments';
import { useModal, IconButton } from '@/shared';
import { SquarePen } from 'lucide-react';
import { UpdateCommentModal } from './update-comment-modal';

export type UpdateCommentButtonProps = {
  comment: Comment;
  onUpdate?: (data?: CommentDto) => void;
};

export const UpdateCommentButton = ({ comment, onUpdate }: UpdateCommentButtonProps) => {
  const modal = useModal();

  const handleUpdate = () => {
    onUpdate?.();
    modal.handleClickClose();
  };

  return (
    <div>
      <IconButton as="button" variant="text" icon={SquarePen} onClick={modal.handleClickOpen} />
      <UpdateCommentModal
        comment={comment}
        onUpdate={handleUpdate}
        open={modal.open}
        onClose={modal.handleClickClose}
      />
    </div>
  );
};
