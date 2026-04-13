import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddFavoriteDto {
  @ApiProperty({
    description: 'Title of recipe',
    example: '1f4c3917-4df2-46c5-9730-96c6f30bf5be',
  })
  @IsString({ message: 'Invalid id' })
  readonly id: string;
}
