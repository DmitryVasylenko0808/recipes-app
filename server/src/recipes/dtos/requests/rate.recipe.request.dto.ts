import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class RateRecipeRequestDto {
  @ApiProperty({
    description: 'Rate value of recipe. Rate value must be between 1 and 5',
    example: 4,
  })
  @IsInt({ message: 'Invalid rate value. The value must be an integer' })
  @Min(1, { message: 'Rate value must be between 1 and 5' })
  @Max(5, { message: 'Rate value must be between 1 and 5' })
  value: number;
}
