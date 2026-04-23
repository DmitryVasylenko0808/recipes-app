import { PopularRecipes } from './ui/popular-recipes';
import { RecentRecipes } from './ui/recent-recipes';
import { TrendingRecipes } from './ui/trending-recipes';

const MainPage = () => {
  return (
    <>
      <TrendingRecipes />
      <PopularRecipes />
      <RecentRecipes />
    </>
  );
};
export default MainPage;
