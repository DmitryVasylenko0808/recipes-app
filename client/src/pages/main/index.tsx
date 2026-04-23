import { PopularRecipes } from './ui/popular-recipes';
import { Recipes } from './ui/recipes';
import { TrendingRecipes } from './ui/trending-recipes';

const MainPage = () => {
  return (
    <>
      <TrendingRecipes />
      <PopularRecipes />
      <Recipes />
    </>
  );
};
export default MainPage;
