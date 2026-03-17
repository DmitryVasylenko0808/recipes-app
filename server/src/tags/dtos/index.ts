import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/generated/prisma/client';

export class TagDto implements Tag {
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

  constructor(partial: Partial<TagDto>) {
    Object.assign(this, partial);
  }
}
