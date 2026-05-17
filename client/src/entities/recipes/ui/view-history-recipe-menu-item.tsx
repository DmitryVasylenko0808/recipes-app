import { pathKeys, MenuItem } from '@/shared';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router';

type ViewHistoryRecipeMenuItemProps = { recipeId: string };

export const ViewHistoryRecipeMenuItem = ({ recipeId }: ViewHistoryRecipeMenuItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(pathKeys.recipes.byIdRecipeVersions(recipeId));

  return (
    <MenuItem icon={Clock} onClick={handleClick}>
      History
    </MenuItem>
  );
};
