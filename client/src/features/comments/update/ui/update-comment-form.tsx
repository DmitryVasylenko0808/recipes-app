import type { Comment, CommentDto } from '@/entities/comments';
import { TextArea, Button } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUpdateComment } from '../model/hooks/use-update-comment';
import { type UpdateCommentFormFields, updateCommentSchema } from '../model/validations';

export type UpdateCommentFormProps = { comment: Comment; onSubmit?: (data: CommentDto) => void };

export const UpdateCommentForm = ({ comment, onSubmit }: UpdateCommentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCommentFormFields>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: {
      content: comment.content,
    },
  });
  const { mutateAsync, isPending } = useUpdateComment();

  const submitHandler = (fields: UpdateCommentFormFields) => {
    mutateAsync({ commentId: comment.id, ...fields })
      .then(onSubmit)
      .catch((err) => alert(err.message));
  };

  return (
    <form className="" onSubmit={handleSubmit(submitHandler)}>
      <TextArea
        rows={6}
        className="mb-4"
        error={errors.content?.message}
        {...register('content')}
      />
      <div className="flex justify-end">
        <Button as="button" type="submit" variant="primary" isLoading={isPending}>
          Save changes
        </Button>
      </div>
    </form>
  );
};
