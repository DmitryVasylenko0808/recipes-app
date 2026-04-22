import { Exclude } from 'class-transformer';
import { RecipeTagDetails } from '../../recipes.types';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeTagDto {
  @Exclude()
  recipeId: string;

  @Exclude()
  tagId: string;

  @ApiProperty({
    description: 'Unique identifier of recipe tag',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: 'Name of recipe tag',
    example: 'ukrainian',
  })
  name: string;

  constructor(partial: RecipeTagDetails) {
    const { tag, ...data } = partial;
    this.id = tag.id;
    this.name = tag.name;
  }
}
