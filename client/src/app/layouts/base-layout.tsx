import { Header } from '@/widgets/header';
import { Outlet } from 'react-router';

export const BaseLayout = () => (
  <div className="bg-background min-h-screen">
    <Header />
    <Outlet />
  </div>
);
