import { Header } from '@/app/widgets';
import { RecipeFilters } from './recipe-filters';

export const MainPage = () => {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-5">
          <aside>
            <RecipeFilters />
          </aside>
          <div></div>
        </div>
      </main>
    </div>
  );
};
