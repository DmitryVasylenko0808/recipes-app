import type { CommentDto } from '@/entities/comments';
import { TextArea, Button } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { usePostComment } from '../model/hooks/use-post-comment';
import { type PostCommentFormFields, postCommentSchema } from '../model/validations';

export type PostCommentFormProps = { recipeId?: string; onSubmit?: (data: CommentDto) => void };

export const PostCommentForm = ({ recipeId, onSubmit }: PostCommentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCommentFormFields>({
    resolver: zodResolver(postCommentSchema),
  });
  const { mutateAsync, isPending } = usePostComment();

  const submitHandler = (fields: PostCommentFormFields) => {
    mutateAsync({ recipeId, ...fields })
      .then(onSubmit)
      .catch((err) => alert(err.message));
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <TextArea
        label="Share your thoughts"
        placeholder="What did you think of this recipe? Any tips or variations to share?"
        rows={6}
        className="mb-4"
        error={errors.content?.message}
        {...register('content')}
      />
      <div className="flex justify-end">
        <Button as="button" type="submit" variant="primary" isLoading={isPending}>
          Post Comment
        </Button>
      </div>
    </form>
  );
};
