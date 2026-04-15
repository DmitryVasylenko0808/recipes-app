import { RecipeComments } from './ui/recipe-comments';
import { RecipeDetails } from './ui/recipe-details';
import { PostRecipeComment } from './ui/post-recipe-comment';

const RecipePage = () => {
  return (
    <>
      <RecipeDetails />
      <PostRecipeComment />
      <RecipeComments />
    </>
  );
};

export default RecipePage;
