import { Recipes } from './ui/recipes';
import { TrendingRecipes } from './ui/trending-recipes';

const MainPage = () => {
  return (
    <>
      <TrendingRecipes />
      <Recipes />
    </>
  );
};
export default MainPage;
