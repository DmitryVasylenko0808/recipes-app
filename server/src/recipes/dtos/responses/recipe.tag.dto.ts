import { ApiProperty } from '@nestjs/swagger';

export class RecipeTagDto {
  @ApiProperty({
    description: 'Unique identifier of recipe tag',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: 'Name of recipe tag',
    example: 'ukrainian',
  })
  name: string;
}
