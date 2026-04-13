import type { Recipe } from '@/entities/recipes';
import { DeleleRecipeMenuItem, ConfirmDeleteRecipeModal } from '@/features/recipe/delete';
import { UpdateRecipeMenuItem } from '@/features/recipe/update';
import { useToggleMenu, useModal, Menu, Button, MenuContent, IconButton } from '@/shared';
import { EllipsisVertical } from 'lucide-react';

type RecipeActionsMenuProps = { recipe: Recipe };

export const RecipeActionsMenu = ({ recipe }: RecipeActionsMenuProps) => {
  const { open, ref, handleToggle } = useToggleMenu();
  const { open: openModal, handleClickOpen, handleClickClose } = useModal();

  return (
    <>
      <Menu
        trigger={
          <IconButton as="button" variant="text" icon={EllipsisVertical} onClick={handleToggle} />
        }
        content={
          <MenuContent ref={ref}>
            <UpdateRecipeMenuItem recipeId={recipe.id} />
            <DeleleRecipeMenuItem onClick={handleClickOpen} />
          </MenuContent>
        }
        open={open}
      />
      <ConfirmDeleteRecipeModal recipe={recipe} open={openModal} onClose={handleClickClose} />
    </>
  );
};
