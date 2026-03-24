import { useAuth } from '@/shared';
import { Navigate, Outlet } from 'react-router';

export const AuthGuard = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to={`/auth/sign-in`} replace />;
};
