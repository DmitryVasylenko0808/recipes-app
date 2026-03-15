import { Exclude } from 'class-transformer';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipePreview } from '../recipes.types';
import { RecipeTagDto } from './recipe.tag.dto';
import { CategoryDto } from 'src/categories/dtos';

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

  constructor(partial: RecipePreview) {
    const { recipeTags, category, ...data } = partial;

    Object.assign(this, data);

    this.category = new CategoryDto(category);
    this.recipeTags = recipeTags.map((rt) => new RecipeTagDto(rt));
  }
}
