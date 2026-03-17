import { Exclude } from 'class-transformer';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipePreview } from '../recipes.types';
import { RecipeTagDto } from './recipe.tag.dto';
import { CategoryDto } from 'src/categories/dtos';
import { RecipeIngredientDetailsDto } from './recipe.ingredient.details.dto';

export class RecipePreviewResponseDto {
  id: string;
  title: string;
  categoryId: string;
  category: CategoryDto;
  description: string;
  previewImage: string;

  @Exclude()
  content: string;

  cookingTime: number;
  difficulty: Difficulty;
  createdAt: Date;
  authorId: string;
  recipeTags: RecipeTagDto[];
  recipeIngredients: RecipeIngredientDetailsDto[];

  constructor(partial: RecipePreview) {
    const { recipeTags, recipeIngredients, category, ...data } = partial;

    Object.assign(this, data);

    this.category = new CategoryDto(category);
    this.recipeTags = recipeTags.map((rt) => new RecipeTagDto(rt));
    this.recipeIngredients = recipeIngredients.map((ri) => new RecipeIngredientDetailsDto(ri));
  }
}
