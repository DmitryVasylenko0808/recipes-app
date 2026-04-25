import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty({
    description: 'Unique identifier for tag',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: 'Tag name',
    example: 'ukrainian',
  })
  name: string;
}
