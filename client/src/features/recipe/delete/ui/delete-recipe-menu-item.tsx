import { MenuItem } from '@/shared';
import { Trash2 } from 'lucide-react';

type DeleleRecipeMenuItemProps = { onClick: () => void };

export const DeleleRecipeMenuItem = ({ onClick }: DeleleRecipeMenuItemProps) => {
  return (
    <MenuItem icon={Trash2} variant="desctructive" onClick={onClick}>
      Delete
    </MenuItem>
  );
};
