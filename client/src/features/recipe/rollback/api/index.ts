import type { RecipeShort } from '@/entities/recipes';
import { apiClient, API_URL } from '@/shared';

export type PatchRollbackRecipeArgs = {
  id?: string;
  version: number;
};

export type PatchRollbackRecipeDto = RecipeShort;

export const patchRollbackRecipe = async (args: PatchRollbackRecipeArgs) => {
  const response = await apiClient.patch<PatchRollbackRecipeDto>(
    `${API_URL}/recipes/${args.id}/current-version`,
    {
      version: args.version,
    }
  );

  return response.data;
};
