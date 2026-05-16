import { FavoriteListItem, FavoriteListItemSafe } from '../types';

export const validFavorites = (favorites: FavoriteListItem[]) => {
  return favorites.filter((f): f is FavoriteListItemSafe => f.recipe.currentVersion !== null);
};
