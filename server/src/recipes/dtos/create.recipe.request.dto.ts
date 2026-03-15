import { Type, Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  IsInt,
  IsEnum,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipeIngredientDto } from './recipe.ingredient.dto';

export class CreateRecipeRequestDto {
  @IsString({ message: 'Invalid title' })
  @MinLength(1, { message: 'Title must contain at least $constraint1 characters' })
  readonly title: string;

  @IsString({ message: 'Invalid category' })
  readonly categoryId: string;

  @IsString({ message: 'Invalid description' })
  @MinLength(1, { message: 'Description must contain at least $constraint1 characters' })
  readonly description: string;

  @IsString({ message: 'Invalid content' })
  @MinLength(1, { message: 'Description must contain at least $constraint1 characters' })
  readonly content: string;

  @IsInt({ message: 'Invalid cooking time' })
  @Type(() => Number)
  readonly cookingTime: number;

  @IsEnum(Difficulty, { message: 'Invalid difficulty' })
  readonly difficulty: Difficulty;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  })
  @IsString({ each: true })
  readonly recipeTagIds: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientDto)
  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  })
  recipeIngredients: RecipeIngredientDto[];
}
