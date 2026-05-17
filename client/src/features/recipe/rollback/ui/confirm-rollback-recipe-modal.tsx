import { type ModalProps, Modal, Typograpghy, Button } from '@/shared';
import { useRollbackRecipe } from '../model/hooks/use-rollback-recipe';

type ConfirmRollbackRecipeModalProps = ModalProps & {
  recipeId?: string;
  version: number;
};

export const ConfirmRollbackRecipeModal = ({
  recipeId,
  version,
  ...modalProps
}: ConfirmRollbackRecipeModalProps) => {
  const { mutateAsync, isPending } = useRollbackRecipe();

  const handleClickRollback = () => {
    mutateAsync({ id: recipeId, version })
      .then(() => alert(`Recipe reverted to version ${version}`))
      .catch((err) => alert(err.message));
  };

  return (
    <Modal {...modalProps}>
      <Typograpghy tagVariant="h3" className="mb-2">
        Revert to version {version}
      </Typograpghy>
      <Typograpghy tagVariant="p" className="mb-4 text-sm">
        This will restore the recipe to version {version}. The current version will be saved in
        history.
      </Typograpghy>
      <div className="flex justify-end">
        <Button
          as="button"
          variant="primary"
          disabled={isPending}
          isLoading={isPending}
          onClick={handleClickRollback}
        >
          Rollback
        </Button>
      </div>
    </Modal>
  );
};
