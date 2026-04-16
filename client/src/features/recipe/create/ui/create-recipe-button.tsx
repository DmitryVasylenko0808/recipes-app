import { Button, pathKeys, type BaseButtonProps } from '@/shared';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

type CreateRecipeButtonProps = Partial<Pick<BaseButtonProps, 'variant'>>;

export const CreateRecipeButton = ({ variant = 'secondary' }: CreateRecipeButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(pathKeys.recipes.create);

  return (
    <Button as="button" variant={variant} icon={Plus} onClick={handleClick}>
      Create Recipe
    </Button>
  );
};
