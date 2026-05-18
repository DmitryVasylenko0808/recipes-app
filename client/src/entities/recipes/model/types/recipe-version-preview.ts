export type RecipeVersionPreview = {
  id: string;
  recipeId: string;
  createdAt: Date;
  version: number;
  changeDescription?: string;
  isCurrent?: boolean;
};
