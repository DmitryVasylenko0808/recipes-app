export type RecipeVersionPreview = {
  id: string;
  createdAt: Date;
  version: number;
  changeDescription?: string;
  isCurrent?: boolean;
};
