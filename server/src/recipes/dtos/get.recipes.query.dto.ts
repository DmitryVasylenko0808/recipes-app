import { Expose, Type, Transform } from 'class-transformer';
import { IsOptional, IsArray, IsString } from 'class-validator';
import { Difficulty } from 'src/generated/prisma/enums';
import { PaginationQueryDto } from './pagination.query.dto';

export class GetRecipesQueryDto extends PaginationQueryDto {
  @IsOptional()
  @Expose({ name: 'search' })
  readonly search?: string;

  @IsOptional()
  @Expose({ name: 'category_names' })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value?.split(',').map(String))
  readonly categoryNames?: string[];

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
