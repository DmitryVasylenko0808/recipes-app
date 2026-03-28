import { Loader, Logo } from '@/shared';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router';

export const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center gap-6">
      <Logo />
      <Suspense
        key={location.pathname}
        fallback={<Loader size="lg" variant="primary" className="my-20" center />}
      >
        <Outlet />
      </Suspense>
    </div>
  );
};
