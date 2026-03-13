import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Difficulty, Recipe, RecipeTag, Tag } from 'src/generated/prisma/client';
import {
  RecipeDetails,
  RecipeFindManyResult,
  RecipePreview,
  RecipeTagDetails,
} from '../interfaces';
import { AuthorPreviewDto } from 'src/authors/dtos';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class RecipeDto implements Recipe {
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

export class RecipeTagDto implements RecipeTag {
  @Exclude()
  recipeId: string;

  @Exclude()
  tagId: string;

  id: string;
  name: string;

  constructor(partial: RecipeTagDetails) {
    const { tag, ...data } = partial;
    Object.assign(this, data);
    this.id = tag.id;
    this.name = tag.name;
  }
}

export class GetRecipesQueryDto {
  @IsNumber()
  @Expose({ name: 'page' })
  @Type(() => Number)
  readonly page: number;

  @IsNumber()
  @Expose({ name: 'limit' })
  @Type(() => Number)
  readonly limit: number;

  @IsOptional()
  @Expose({ name: 'search' })
  readonly search?: string;

  @IsOptional()
  @Expose({ name: 'min_cooking_time' })
  @Type(() => Number)
  readonly minCookingTime: number;

  @IsOptional()
  @Expose({ name: 'max_cooking_time' })
  @Type(() => Number)
  readonly maxCookingTime: number;

  @IsOptional()
  @Expose({ name: 'tag_names' })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value?.split(',').map(String))
  readonly tagNames?: string[];

  @IsOptional()
  @Expose({ name: 'ingredient_names' })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value?.split(',').map(String))
  readonly ingredientNames?: string[];

  @IsOptional()
  @Expose({ name: 'difficulties' })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value?.split(',').map(String))
  readonly difficulties?: Difficulty[];
}

export class GetAuthorRecipesQueryDto {
  @IsNumber()
  @Expose({ name: 'page' })
  @Type(() => Number)
  readonly page: number;

  @IsNumber()
  @Expose({ name: 'limit' })
  @Type(() => Number)
  readonly limit: number;
}

export class RecipePreviewResponseDto implements Recipe {
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

interface PaginatedResponseDto<T> {
  data: T[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
}

export class GetRecipesResponseDto implements PaginatedResponseDto<RecipePreviewResponseDto> {
  data: RecipePreviewResponseDto[];
  totalCount: number;
  totalPage: number;
  currentPage: number;

  constructor(partial: Partial<RecipeFindManyResult>) {
    const { data, ...other } = partial;

    Object.assign(this, other);

    this.data = data?.map((r) => new RecipePreviewResponseDto(r)) || [];
  }
}

export class RecipeResponseDto implements Recipe {
  id: string;
  title: string;
  description: string;
  //   @Transform((value) => `${process.env.SERVER_UPLOADS_URL}/${value}`)
  previewImage: string;
  content: string;
  cookingTime: number;
  difficulty: Difficulty;
  createdAt: Date;
  authorId: string;
  author: AuthorPreviewDto;
  recipeTags: RecipeTagDto[];

  constructor(partial: RecipeDetails) {
    const { recipeTags, author, ...data } = partial;

    Object.assign(this, data);

    this.author = new AuthorPreviewDto(author);
    this.recipeTags = recipeTags.map((rt) => new RecipeTagDto(rt));
  }
}

export class CreateRecipeDto {
  @IsString({ message: 'Invalid title' })
  @MinLength(1, { message: 'Title must contain at least $constraint1 characters' })
  readonly title: string;

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
  @Type(() => CreateRecipeIngredientDto)
  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  })
  recipeIngredients: CreateRecipeIngredientDto[];
}

export class CreateRecipeIngredientDto {
  @IsString()
  ingredientId: string;

  @IsInt()
  @Min(1)
  amount: number;

  @IsString()
  unit: string;
}

export class UpdateRecipeDto {
  @IsOptional()
  @IsString({ message: 'Invalid title' })
  @MinLength(1, { message: 'Title must contain at least $constraint1 characters' })
  readonly title?: string;

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
  @Type(() => CreateRecipeIngredientDto)
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    return JSON.parse(value);
  })
  recipeIngredients?: CreateRecipeIngredientDto[];
}
