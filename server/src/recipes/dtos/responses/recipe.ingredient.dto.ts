import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

export class RecipeIngredientDto {
  @ApiProperty({
    description: 'Unique identifier of ingredint',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  @IsString()
  ingredientId: string;

  @ApiProperty({
    description: 'Amount of recipe ingredient',
    example: 100,
  })
  @IsInt()
  @Min(1)
  amount: number;

  @ApiProperty({
    description: 'Unit of recipe ingredient',
    example: 'g',
  })
  @IsString()
  unit: string;

  constructor(partial: Partial<RecipeIngredientDto>) {
    Object.assign(this, partial);
  }
}
