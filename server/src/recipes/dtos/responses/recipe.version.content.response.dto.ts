import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from 'src/categories/dtos';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipeIngredientDetailsDto } from './recipe.ingredient.details.dto';
import { RecipeTagDto } from './recipe.tag.dto';

export class RecipeVersionContentResponseDto {
  @ApiProperty({
    description: 'Title of recipe',
    example: 'Spaghetti carbonara',
  })
  title: string;

  @ApiProperty({
    description: 'Short description of recipe',
    example: 'Classic Italian pasta dish with creamy egg sauce, crispy bacon, and parmesan cheese.',
  })
  description: string;

  @ApiProperty({ description: 'Preview image of recipe' })
  previewImage: string | null;

  @ApiProperty({
    description: 'Cookint time of recipe. In minutes',
    example: 30,
  })
  cookingTime: number;

  @ApiProperty({
    description: 'Difficulty of recipe',
    example: Difficulty.medium,
    enum: Difficulty,
  })
  difficulty: Difficulty;

  @ApiProperty({
    description: 'Unique identifier of category',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  categoryId: string;

  @ApiProperty({ type: CategoryDto, description: 'Category data' })
  category: CategoryDto;

  @ApiProperty({ type: [String], description: 'Steps of cooking recipe' })
  recipeSteps: string[];

  @ApiProperty({ type: [RecipeTagDto] })
  recipeTags: RecipeTagDto[];

  @ApiProperty({ type: [RecipeIngredientDetailsDto] })
  recipeIngredients: RecipeIngredientDetailsDto[];
}
