import { MenuItem, pathKeys } from '@/shared';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

export const CreateRecipeMenuItem = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate(pathKeys.recipes.create);

  return (
    <MenuItem icon={Plus} onClick={handleClick}>
      Create Recipe
    </MenuItem>
  );
};
