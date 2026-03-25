import { Button, pathKeys } from '@/shared';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

export const CreateRecipeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate(pathKeys.recipes.create);

  return (
    <Button as="button" variant="secondary" icon={Plus} onClick={handleClick}>
      Create Recipe
    </Button>
  );
};
