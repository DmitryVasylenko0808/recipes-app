import { useGetAuthorById } from '@/entities/authors';
import { EditProfileForm } from '@/features/authors/edit-profile';
import { Loader } from '@/shared';
import { useParams, useNavigate, Navigate } from 'react-router';

export const EditingProfile = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetAuthorById(id);
  const navigate = useNavigate();

  if (error) return <Navigate to="*" replace />;

  return (
    <div className="mx-auto flex max-w-7xl justify-center px-4 py-8">
      {isLoading && <Loader variant="primary" size="lg" className="my-10" center />}
      {data && <EditProfileForm author={data} onSubmit={() => navigate(`/authors/${id}`)} />}
    </div>
  );
};
