export class FavoriteRecipeDto {
  id: string;
  userId: string;
  recipeId: string;
  favoritedAt: Date;

  constructor(partial: Partial<FavoriteRecipeDto>) {
    Object.assign(this, partial);
  }
}
