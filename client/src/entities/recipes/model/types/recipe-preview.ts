import type { Category } from '@/entities/categories';
import type { Tag } from '@/entities/tags';

export type RecipePreview = {
  id: string;
  title: string;
  categoryId: string;
  category: Category;
  description: string;
  previewImage: string;
  cookingTime: number;
  difficulty: Difficulty;
  viewsCount: number;
  isFavorite?: boolean;
  createdAt: Date;
  recipeTags: Tag[];
  recipeIngredients: RecipeIngredient[];
};

export type RecipeIngredient = {
  ingredientId: string;
  name: string;
  amount: number;
  unit: string;
};

const Difficulty = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
} as const;
export type Difficulty = keyof typeof Difficulty;
