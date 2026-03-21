import { Logo } from '@/shared';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <Logo />
      <Outlet />
    </div>
  );
};
