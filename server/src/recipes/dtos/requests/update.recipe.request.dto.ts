import { Type, Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  IsInt,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipeIngredientDto } from '../responses/recipe.ingredient.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRecipeRequestDto {
  @ApiProperty({
    description: 'Title of recipe',
    example: 'Spaghetti carbonara',
  })
  @IsOptional()
  @IsString({ message: 'Invalid title' })
  @MinLength(1, { message: 'Title must contain at least $constraint1 characters' })
  readonly title?: string;

  @ApiProperty({
    description: 'Unique identifier of category',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  @IsOptional()
  @IsString({ message: 'Invalid category' })
  @MinLength(1, { message: 'Category must contain at least $constraint1 characters' })
  readonly categoryId?: string;

  @ApiProperty({
    description: 'Short description of recipe',
    example: 'Classic Italian pasta dish with creamy egg sauce, crispy bacon, and parmesan cheese.',
  })
  @IsOptional()
  @IsString({ message: 'Invalid description' })
  @MinLength(1, { message: 'Description must contain at least $constraint1 characters' })
  readonly description?: string;

  @ApiProperty({
    description: 'Cooking time of recipe. In minutes',
    example: 30,
  })
  @IsOptional()
  @IsInt({ message: 'Invalid cooking time' })
  @Type(() => Number)
  readonly cookingTime?: number;

  @ApiProperty({
    description: 'Difficulty of recipe',
    example: Difficulty.medium,
    enum: Difficulty,
  })
  @IsOptional()
  @IsEnum(Difficulty, { message: 'Invalid difficulty' })
  readonly difficulty?: Difficulty;

  @ApiProperty({
    type: [String],
    description: 'Cooking steps of recipes',
    example: [
      'Place lettuce in a large salad bowl',
      'Add croutons and freshly grated parmesan cheese.',
    ],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  })
  readonly recipeSteps?: string[];

  @ApiProperty({
    description: 'Tag ids of recipe',
    examples: ['43dff760-fe8e-4f60-9dda-e593e924ebda', '811909ef-1ac8-4197-b674-05737d68b4a6'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    return JSON.parse(value);
  })
  @IsString({ each: true })
  readonly recipeTagIds?: string[];

  @ApiProperty({
    description: 'Ingredients of recipe',
    examples: [
      { ingredientId: '20695ca1-2b44-4909-9665-4fba19af86a8', amount: 2, unit: 'pcs' },
      { ingredientId: '58bbd258-ec7c-4e34-b16d-2539d69a9e48', amount: 1, unit: 'l' },
    ],
    type: [RecipeIngredientDto],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientDto)
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    return JSON.parse(value);
  })
  readonly recipeIngredients?: RecipeIngredientDto[];
}
