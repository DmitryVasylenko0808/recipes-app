import { MenuItem } from '@/shared';
import { useNavigate } from 'react-router';

type UpdateRecipeMenuItemProps = { recipeId: string };

export const UpdateRecipeMenuItem = ({ recipeId }: UpdateRecipeMenuItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/recipes/${recipeId}/update`);

  return <MenuItem onClick={handleClick}>Edit Recipe</MenuItem>;
};
