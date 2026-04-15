import { PostCommentForm } from '@/features/comments/post';
import { Card } from '@/shared';
import { useParams } from 'react-router';

export const PostRecipeComment = () => {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Card className="p-6">
        <PostCommentForm recipeId={id} />
      </Card>
    </div>
  );
};
