import { InternalServerErrorException } from '@nestjs/common';
import { RecipeFull, RecipeFullSafe } from '../recipes.types';

export function assertHasCurrentVersion(recipe: RecipeFull): asserts recipe is RecipeFullSafe {
  if (!recipe.currentVersion) {
    throw new InternalServerErrorException('Recipe version is missing');
  }
}
