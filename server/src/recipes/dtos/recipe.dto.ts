import { Exclude } from 'class-transformer';
import { Difficulty } from 'src/generated/prisma/enums';

export class RecipeDto {
  id: string;
  title: string;

  @Exclude()
  description: string;
  previewImage: string;

  @Exclude()
  content: string;
  cookingTime: number;
  difficulty: Difficulty;
  createdAt: Date;
  authorId: string;

  constructor(partial: Partial<RecipeDto>) {
    Object.assign(this, partial);
  }
}
