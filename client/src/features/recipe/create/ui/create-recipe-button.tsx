import { Button } from '@/shared';
import { useNavigate } from 'react-router';

export const CreateRecipeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/recipes/create`);

  return (
    <Button as="button" variant="secondary" onClick={handleClick}>
      Create Recipe
    </Button>
  );
};
