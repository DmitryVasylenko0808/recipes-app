import type { Recipe } from '@/entities/recipes';
import { type ModalProps, Modal, Typograpghy, Button, pathKeys } from '@/shared';
import { useNavigate } from 'react-router';
import { useDeleteRecipeById } from '../model/hooks/use-delete-recipe-by-id';

type ConfirmDeleteRecipeModalProps = ModalProps & { recipe: Recipe };

export const ConfirmDeleteRecipeModal = ({
  recipe,
  ...modalProps
}: ConfirmDeleteRecipeModalProps) => {
  const { mutateAsync, isPending } = useDeleteRecipeById();
  const navigate = useNavigate();

  const handleClickDelete = () => {
    mutateAsync(recipe.id)
      .then(() => {
        alert('Recipe is deleted');
        navigate(pathKeys.main);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Modal className="max-w-lg" {...modalProps}>
      <Typograpghy tagVariant="h3" className="mb-2">
        Are you absolutely sure?
      </Typograpghy>
      <Typograpghy tagVariant="p" className="mb-4 text-sm">
        This action cannot be undone. This will permanently delete the recipe from your collection.
      </Typograpghy>
      <div className="flex justify-end">
        <Button
          as="button"
          variant="primary"
          disabled={isPending}
          isLoading={isPending}
          onClick={handleClickDelete}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
