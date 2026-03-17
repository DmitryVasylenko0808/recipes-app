import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    description: 'Unique identifier for category',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: 'Category name',
    example: 'dinner',
  })
  name: string;

  constructor(partial: Partial<CategoryDto>) {
    Object.assign(this, partial);
  }
}
