import { MenuItem } from '@/shared';

type DeleleRecipeMenuItemProps = { onClick: () => void };

export const DeleleRecipeMenuItem = ({ onClick }: DeleleRecipeMenuItemProps) => {
  return (
    <MenuItem variant="desctructive" onClick={onClick}>
      Delete
    </MenuItem>
  );
};
