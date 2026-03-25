import { useGetAuthorById, AuthorInfo } from '@/entities/authors';
import { useParams, Navigate } from 'react-router';
import { AuthorDetailsSkeleton } from './author-details-skeleton';
import { EditProfileButton } from '@/features/authors/edit-profile';
import { useAuth } from '@/shared';

export const AuthorDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetAuthorById(id);
  const { currentUser } = useAuth();

  const isOwnProfile = currentUser?.id === data?.id;

  if (error) return <Navigate to="*" state={{ errorMessage: error.message }} replace />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {isLoading && <AuthorDetailsSkeleton />}
      {data && (
        <AuthorInfo
          author={data}
          actionsSlot={isOwnProfile && <EditProfileButton authorId={data.id} />}
        />
      )}
    </div>
  );
};
