import { Type, Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MinLength,
  IsInt,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipeIngredientDto } from './recipe.ingredient.dto';

export class UpdateRecipeRequestDto {
  @IsOptional()
  @IsString({ message: 'Invalid title' })
  @MinLength(1, { message: 'Title must contain at least $constraint1 characters' })
  readonly title?: string;

  @IsOptional()
  @IsString({ message: 'Invalid category' })
  @MinLength(1, { message: 'Category must contain at least $constraint1 characters' })
  readonly categoryId?: string;

  @IsOptional()
  @IsString({ message: 'Invalid description' })
  @MinLength(1, { message: 'Description must contain at least $constraint1 characters' })
  readonly description?: string;

  @IsOptional()
  @IsString({ message: 'Invalid content' })
  @MinLength(1, { message: 'Description must contain at least $constraint1 characters' })
  readonly content?: string;

  @IsOptional()
  @IsInt({ message: 'Invalid cooking time' })
  @Type(() => Number)
  readonly cookingTime?: number;

  @IsOptional()
  @IsEnum(Difficulty, { message: 'Invalid difficulty' })
  readonly difficulty?: Difficulty;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    return JSON.parse(value);
  })
  @IsString({ each: true })
  readonly recipeTagIds?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientDto)
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    return JSON.parse(value);
  })
  recipeIngredients?: RecipeIngredientDto[];
}
