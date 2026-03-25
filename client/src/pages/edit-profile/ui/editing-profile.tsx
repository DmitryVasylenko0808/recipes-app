import { useGetAuthorById } from '@/entities/authors';
import { EditProfileForm } from '@/features/authors/edit-profile';
import { Loader, pathKeys } from '@/shared';
import { useParams, useNavigate, Navigate } from 'react-router';

export const EditingProfile = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetAuthorById(id);
  const navigate = useNavigate();

  const handleSubmit = () => navigate(pathKeys.authors.byId(id));

  if (error) return <Navigate to="*" state={{ errorMessage: error.message }} replace />;

  return (
    <div className="mx-auto flex max-w-7xl justify-center px-4 py-8">
      {isLoading && <Loader variant="primary" size="lg" className="my-10" center />}
      {data && <EditProfileForm author={data} onSubmit={handleSubmit} />}
    </div>
  );
};
