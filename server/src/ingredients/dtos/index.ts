import { ApiProperty } from '@nestjs/swagger';

export class IngredientDto {
  @ApiProperty({
    description: 'Unique identifier for ingredient',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: 'Ingredient name',
    example: 'eggs',
  })
  name: string;

  constructor(partial: Partial<IngredientDto>) {
    Object.assign(this, partial);
  }
}
