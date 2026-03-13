import { Exclude } from 'class-transformer';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipePreview } from '../recipes.types';
import { RecipeTagDto } from './recipe.tag.dto';

export class RecipePreviewResponseDto {
  id: string;
  title: string;
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
    const { recipeTags, ...data } = partial;

    Object.assign(this, data);

    this.recipeTags = recipeTags.map((rt) => new RecipeTagDto(rt));
  }
}
