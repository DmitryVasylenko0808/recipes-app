import { Exclude, Transform } from 'class-transformer';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipeTagDto } from './recipe.tag.dto';
import { CategoryDto } from 'src/categories/dtos';
import { RecipeIngredientDetailsDto } from './recipe.ingredient.details.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecipePreviewResponseDto {
  @ApiProperty({
    description: 'Unique identifier of recipe',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: 'Title of recipe',
    example: 'Spaghetti carbonara',
  })
  title: string;

  @ApiProperty({
    description: 'Unique identifier of category',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  categoryId: string;

  @ApiProperty({ type: CategoryDto, description: 'Category data' })
  category: CategoryDto;

  @ApiProperty({
    description: 'Short description of recipe',
    example: 'Classic Italian pasta dish with creamy egg sauce, crispy bacon, and parmesan cheese.',
  })
  description: string;

  @ApiProperty({
    description: 'Preview image of recipe',
  })
  @Transform(({ value }) => `${process.env.SERVER_UPLOADS_URL}/${value}`)
  previewImage: string;

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
    description: 'Show how many users viewed recipe',
    example: 50,
  })
  viewsCount: number;

  @ApiProperty({
    description: 'Show how many users rated recipe',
    example: 20,
  })
  ratingsCount: number;

  @ApiProperty({
    description: 'Average rating of recipe',
    example: 4.5,
  })
  ratingsAvg: number;

  @ApiProperty({
    description: 'Published date of recipe',
    example: '2024-11-01T02:14:34.244Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Unique identifier of author',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  authorId: string;

  @ApiPropertyOptional({
    description: 'Determines if recipe is favorited by current user',
    example: false,
  })
  isFavorite?: boolean;

  @ApiProperty({ type: [RecipeTagDto] })
  recipeTags: RecipeTagDto[];

  @ApiProperty({ type: [RecipeIngredientDetailsDto] })
  recipeIngredients: RecipeIngredientDetailsDto[];
}
