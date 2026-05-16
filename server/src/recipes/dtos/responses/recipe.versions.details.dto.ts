import { Difficulty } from 'src/generated/prisma/enums';
import { RecipeIngredientDetailsDto } from './recipe.ingredient.details.dto';
import { RecipeTagDto } from './recipe.tag.dto';
import { CategoryDto } from 'src/categories/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecipeVersionDetailsResponseDto {
  @ApiProperty({
    description: 'Unique identifier of recipe version',
    example: '74bd30be-3d72-4f27-9609-38ec711d34f1',
  })
  id: string;

  @ApiProperty({
    description: 'Unique identifier of recipe',
    example: '74bd30be-3d72-4f27-9609-38ec711d34f1',
  })
  recipeId: string;

  @ApiProperty({ description: 'Version of recipe' })
  version: number;

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

  @ApiProperty({
    description: 'Date of creating recipe version',
    example: '2026-05-16T14:54:39.535Z',
  })
  createdAt: Date;

  @ApiProperty({ type: [String], description: 'Steps of cooking recipe' })
  recipeSteps: string[];

  @ApiProperty({ type: [RecipeTagDto] })
  recipeTags: RecipeTagDto[];

  @ApiProperty({ type: [RecipeIngredientDetailsDto] })
  recipeIngredients: RecipeIngredientDetailsDto[];

  @ApiPropertyOptional({ description: 'Change description of recipe' })
  changeDescription?: string | null;
}
