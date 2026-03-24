import { MenuItem } from '@/shared';
import { useNavigate } from 'react-router';

export const CreateRecipeMenuItem = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/recipes/create`);

  return <MenuItem onClick={handleClick}>Create Recipe</MenuItem>;
};
