import { pathKeys, useAuth } from '@/shared';
import { Navigate, Outlet } from 'react-router';

export const AuthGuard = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to={pathKeys.auth.signIn} replace />;
};
