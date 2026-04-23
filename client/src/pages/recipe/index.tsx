import { RecipeComments } from './ui/recipe-comments';
import { RecipeDetails } from './ui/recipe-details';
import { PostRecipeComment } from './ui/post-recipe-comment';
import { SimilarRecipes } from './ui/similar-recipes';

const RecipePage = () => {
  return (
    <>
      <RecipeDetails />
      <SimilarRecipes />
      <PostRecipeComment />
      <RecipeComments />
    </>
  );
};

export default RecipePage;
