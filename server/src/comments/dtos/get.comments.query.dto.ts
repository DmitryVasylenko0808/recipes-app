import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/recipes/dtos';
import { SortCommentsPreset } from '../types';

export class GetCommentsQueryDto extends PaginationQueryDto {
  @Expose({ name: 'sort' })
  @IsOptional()
  @IsEnum(SortCommentsPreset, { message: 'Invalid sort' })
  readonly sortPreset?: SortCommentsPreset;
}
