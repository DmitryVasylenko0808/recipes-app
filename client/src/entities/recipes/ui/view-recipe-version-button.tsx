import { Button, pathKeys } from '@/shared';

type ViewRecipeVersionButtonProps = { id?: string; version?: number; isCurrent?: boolean };

export const ViewRecipeVersionButton = ({
  id,
  version,
  isCurrent,
}: ViewRecipeVersionButtonProps) => {
  return (
    <Button
      as="link"
      to={pathKeys.recipes.byIdAndRecipeVersion(id, version)}
      variant={isCurrent ? 'primary' : 'secondary'}
    >
      View
    </Button>
  );
};
