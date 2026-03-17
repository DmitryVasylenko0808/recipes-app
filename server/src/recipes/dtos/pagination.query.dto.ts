import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    example: 1,
    default: 1,
  })
  @IsNumber()
  @Expose({ name: 'page' })
  @Type(() => Number)
  readonly page: number;

  @ApiProperty({
    example: 20,
    default: 10,
  })
  @IsNumber()
  @Expose({ name: 'limit' })
  @Type(() => Number)
  readonly limit: number;
}
