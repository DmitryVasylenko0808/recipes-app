import type { Comment, CommentDto } from '@/entities/comments';
import { type ModalProps, Modal, Typograpghy } from '@/shared';
import { UpdateCommentForm } from './update-comment-form';

export type UpdateCommentModalProps = ModalProps & {
  comment: Comment;
  onUpdate?: (data?: CommentDto) => void;
};

export const UpdateCommentModal = ({
  comment,
  onUpdate,
  ...modalProps
}: UpdateCommentModalProps) => {
  return (
    <Modal className="w-3xl" {...modalProps}>
      <Typograpghy tagVariant="h3" className="mb-2">
        Update comment
      </Typograpghy>
      <UpdateCommentForm comment={comment} onSubmit={onUpdate} />
    </Modal>
  );
};
