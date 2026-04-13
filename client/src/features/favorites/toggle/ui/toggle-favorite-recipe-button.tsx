import type { RecipePreview, Recipe } from '@/entities/recipes';
import { IconButton } from '@/shared';
import { Heart } from 'lucide-react';
import { useToggleFavoriteRecipe } from '../model/hooks/use-toggle-favorite-recipe';
import type { MouseEvent } from 'react';

type ToggleFavoriteRecipeButtonProps = { recipe: RecipePreview | Recipe };
export const ToggleFavoriteRecipeButton = ({ recipe }: ToggleFavoriteRecipeButtonProps) => {
  const { mutateAsync } = useToggleFavoriteRecipe();

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    mutateAsync(recipe);
  };

  return (
    <IconButton
      as="button"
      variant={recipe.isFavorite ? 'primary' : 'secondary'}
      icon={Heart}
      onClick={handleClick}
    />
  );
};
