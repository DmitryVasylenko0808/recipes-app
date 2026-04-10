import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { Difficulty } from 'src/generated/prisma/enums';

export class RecipeDto {
  @ApiProperty({
    description: 'Unique identifier of recipe',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: 'Title of recipe',
    example: 'Spaghetti carbonara',
  })
  title: string;

  @Exclude()
  description: string;

  @ApiProperty({
    description: 'Preview image of recipe',
    example:
      'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22884%22%20height%3D%22970%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%2358ced2%22%2F%3E%3Ctext%20x%3D%22442%22%20y%3D%22485%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E884x970%3C%2Ftext%3E%3C%2Fsvg%3E',
  })
  @Transform(({ value }) => `${process.env.SERVER_UPLOADS_URL}/${value}`)
  previewImage: string;

  @Exclude()
  content: string;

  @ApiProperty({
    description: 'Cookint time of recipe. In minutes',
    example: 30,
  })
  cookingTime: number;

  @ApiProperty({
    description: 'Difficulty of recipe',
    example: Difficulty.medium,
    enum: Difficulty,
  })
  difficulty: Difficulty;

  @ApiProperty({
    description: 'Published date of recipe',
    example: '2024-11-01T02:14:34.244Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Unique identifier of author',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  authorId: string;

  constructor(partial: Partial<RecipeDto>) {
    Object.assign(this, partial);
  }
}
