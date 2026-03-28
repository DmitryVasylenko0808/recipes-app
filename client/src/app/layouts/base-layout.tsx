import { Loader } from '@/shared';
import { Header } from '@/widgets/header';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router';

export const BaseLayout = () => {
  const location = useLocation();

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Suspense
        key={location.pathname}
        fallback={<Loader size="lg" variant="primary" className="my-20" center />}
      >
        <Outlet />
      </Suspense>
    </div>
  );
};
