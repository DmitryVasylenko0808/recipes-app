import type { CommentDto } from '@/entities/comments';
import { Button, Modal, Typograpghy, type ModalProps } from '@/shared';
import { useDeleteComment } from '../model/hooks/use-delete-comment';

export type ConfirmDeleteCommentModalProps = ModalProps & {
  commentId: string;
  onDelete?: (data?: CommentDto) => void;
};

export const ConfirmDeleteCommentModal = ({
  commentId,
  onDelete,
  ...modalProps
}: ConfirmDeleteCommentModalProps) => {
  const { mutateAsync, isPending } = useDeleteComment();

  const handleClickDelete = () => {
    mutateAsync(commentId)
      .then(onDelete)
      .catch((err) => alert(err.message));
  };

  return (
    <Modal {...modalProps}>
      <Typograpghy tagVariant="h3" className="mb-2">
        Delete comment?
      </Typograpghy>
      <Typograpghy tagVariant="p" className="mb-4 text-sm">
        This action cannot be undone. This will permanently delete the comment.
      </Typograpghy>
      <div className="flex justify-end">
        <Button
          as="button"
          variant="primary"
          disabled={isPending}
          isLoading={isPending}
          onClick={handleClickDelete}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
