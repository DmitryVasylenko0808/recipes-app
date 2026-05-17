import { useModal, Button } from '@/shared';
import { RotateCcw } from 'lucide-react';
import { ConfirmRollbackRecipeModal } from './confirm-rollback-recipe-modal';

type RollbackRecipeButtonProps = { recipeId?: string; version: number };

export const RollbackRecipeButton = ({ recipeId, version }: RollbackRecipeButtonProps) => {
  const modal = useModal();

  return (
    <div>
      <Button as="button" variant="secondary" icon={RotateCcw} onClick={modal.handleClickOpen}>
        Rollback
      </Button>
      <ConfirmRollbackRecipeModal
        recipeId={recipeId}
        version={version}
        open={modal.open}
        onClose={modal.handleClickClose}
      />
    </div>
  );
};
