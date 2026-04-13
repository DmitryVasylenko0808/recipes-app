import { ApiProperty } from '@nestjs/swagger';

export class FavoriteRecipeDto {
  @ApiProperty({
    description: 'Unique identifier of favorite recipe',
    example: '1f4c3917-4df2-46c5-9730-96c6f30bf5be',
  })
  id: string;

  @ApiProperty({
    description: 'Unique identifier of user',
    example: '1391645a-d2f6-40dc-83e1-8e796c13aae4',
  })
  userId: string;

  @ApiProperty({
    description: 'Unique identifier of recipe',
    example: '1f4c3917-4df2-46c5-9730-96c6f30bf5be',
  })
  recipeId: string;

  @ApiProperty({
    description: 'Date of adding recipe to favorites',
    example: '2025-11-01T02:14:34.244Z',
  })
  favoritedAt: Date;

  constructor(partial: Partial<FavoriteRecipeDto>) {
    Object.assign(this, partial);
  }
}
