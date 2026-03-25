import { MenuItem, pathKeys } from '@/shared';
import { SquarePen } from 'lucide-react';
import { useNavigate } from 'react-router';

type UpdateRecipeMenuItemProps = { recipeId: string };

export const UpdateRecipeMenuItem = ({ recipeId }: UpdateRecipeMenuItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(pathKeys.recipes.byIdUpdate(recipeId));

  return (
    <MenuItem icon={SquarePen} onClick={handleClick}>
      Edit Recipe
    </MenuItem>
  );
};
