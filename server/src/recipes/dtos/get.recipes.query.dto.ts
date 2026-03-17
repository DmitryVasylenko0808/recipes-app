import { Expose, Type, Transform } from 'class-transformer';
import { IsOptional, IsArray, IsString } from 'class-validator';
import { Difficulty } from 'src/generated/prisma/enums';
import { PaginationQueryDto } from './pagination.query.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetRecipesQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Search recipes by title',
    example: 'Spaghetti',
  })
  @IsOptional()
  @Expose({ name: 'search' })
  readonly search?: string;

  @ApiPropertyOptional({
    description: 'Filter by category names (comma separated)',
    example: 'dinner,lunch',
  })
  @IsOptional()
  @Expose({ name: 'category_names' })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value?.split(',').map(String))
  readonly categoryNames?: string[];

  @ApiPropertyOptional({
    description: 'Filter from minimal cooking time. In minutes',
    example: 5,
  })
  @IsOptional()
  @Expose({ name: 'min_cooking_time' })
  @Type(() => Number)
  readonly minCookingTime: number;

  @ApiPropertyOptional({
    description: 'Filter to maximal cooking time. In minutes',
    example: 120,
  })
  @IsOptional()
  @Expose({ name: 'max_cooking_time' })
  @Type(() => Number)
  readonly maxCookingTime: number;

  @ApiPropertyOptional({
    description: 'Filter by tag names (comma separated)',
    example: 'vegan,quick',
  })
  @IsOptional()
  @Expose({ name: 'tag_names' })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value?.split(',').map(String))
  readonly tagNames?: string[];

  @ApiPropertyOptional({
    description: 'Filter by ingredient names (comma separated)',
    example: 'kiwi,pomidor',
  })
  @IsOptional()
  @Expose({ name: 'ingredient_names' })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value?.split(',').map(String))
  readonly ingredientNames?: string[];

  @ApiPropertyOptional({
    enum: Difficulty,
    isArray: true,
    description: 'Filter by recipe difficulties',
    example: 'easy,medium',
  })
  @IsOptional()
  @Expose({ name: 'difficulties' })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value?.split(',').map(String))
  readonly difficulties?: Difficulty[];
}
