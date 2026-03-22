import { Header } from '@/app/widgets';
import { Recipes } from './ui/recipes';

export const MainPage = () => {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Recipes />
    </div>
  );
};
