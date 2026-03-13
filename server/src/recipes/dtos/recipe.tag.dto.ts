import { Exclude } from 'class-transformer';
import { RecipeTagDetails } from '../recipes.types';

export class RecipeTagDto {
  @Exclude()
  recipeId: string;

  @Exclude()
  tagId: string;

  id: string;
  name: string;

  constructor(partial: RecipeTagDetails) {
    const { tag, ...data } = partial;
    this.id = tag.id;
    this.name = tag.name;
  }
}
