import type { Recipe } from '@/entities/recipes';
import { DeleleRecipeMenuItem, ConfirmDeleteRecipeModal } from '@/features/recipe/delete';
import { useToggleMenu, useModal, Menu, Button, MenuContent } from '@/shared';

type RecipeActionsMenuProps = { recipe: Recipe };

export const RecipeActionsMenu = ({ recipe }: RecipeActionsMenuProps) => {
  const { open, ref, handleToggle } = useToggleMenu();
  const { open: openModal, handleClickOpen, handleClickClose } = useModal();

  return (
    <>
      <Menu
        trigger={
          <Button as="button" variant="text" onClick={handleToggle}>
            |
          </Button>
        }
        content={
          <MenuContent ref={ref}>
            <DeleleRecipeMenuItem onClick={handleClickOpen} />
          </MenuContent>
        }
        open={open}
      />
      <ConfirmDeleteRecipeModal recipe={recipe} open={openModal} onClose={handleClickClose} />
    </>
  );
};
