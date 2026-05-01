import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/recipes/dtos';
import { SortCommentsPreset } from '../types';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetCommentsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    enum: SortCommentsPreset,
    description: 'Sort comments by newest (by createdAt:desc) or popular (by likesCount:desc)',
    default: 'newest',
    example: 'newest',
  })
  @Expose({ name: 'sort' })
  @IsOptional()
  @IsEnum(SortCommentsPreset, { message: 'Invalid sort' })
  readonly sortPreset?: SortCommentsPreset;
}
