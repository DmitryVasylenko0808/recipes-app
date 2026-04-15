import type { CommentDto } from '@/entities/comments';
import { useModal, IconButton } from '@/shared';
import { Trash2 } from 'lucide-react';
import { ConfirmDeleteCommentModal } from './delete-comment-confirm-modal';

export type DeleteCommentButtonProps = {
  commentId: string;
  onDelete?: (data?: CommentDto) => void;
};

export const DeleteCommentButton = ({ commentId, onDelete }: DeleteCommentButtonProps) => {
  const modal = useModal();

  return (
    <div>
      <IconButton as="button" variant="destructive" icon={Trash2} onClick={modal.handleClickOpen} />
      <ConfirmDeleteCommentModal
        commentId={commentId}
        open={modal.open}
        onClose={modal.handleClickClose}
        onDelete={onDelete}
      />
    </div>
  );
};
