import { Expose, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  @Expose({ name: 'page' })
  @Type(() => Number)
  readonly page: number;

  @IsNumber()
  @Expose({ name: 'limit' })
  @Type(() => Number)
  readonly limit: number;
}
