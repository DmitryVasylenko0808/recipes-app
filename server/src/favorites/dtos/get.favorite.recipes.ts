import { PaginatedResponseDto, RecipePreviewResponseDto } from 'src/recipes/dtos';
import { Favorite } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class GetFavoriteRecipesItemDto {
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

  @ApiProperty({ type: RecipePreviewResponseDto, description: 'Details of favorited recipe' })
  recipe: RecipePreviewResponseDto;

  constructor(partial: Partial<Favorite>) {
    const { recipe, ...rest } = partial;

    Object.assign(this, rest);

    if (recipe) {
      this.recipe = new RecipePreviewResponseDto(recipe);
    }
  }
}

export class GetFavoriteRecipesDto implements PaginatedResponseDto<GetFavoriteRecipesItemDto> {
  @ApiProperty({ type: [GetFavoriteRecipesItemDto], description: 'Favorited recipes' })
  data: GetFavoriteRecipesItemDto[];

  @ApiProperty({ description: 'Total count of favorited recipe', example: 20 })
  totalCount: number;

  @ApiProperty({ description: 'Total pages of favorited recipe', example: 1 })
  totalPage: number;

  @ApiProperty({ description: 'Current page of favorited recipe', example: 1 })
  currentPage: number;

  constructor(partial: PaginatedResponseDto<Favorite>) {
    const { data, ...rest } = partial;

    Object.assign(this, rest);

    this.data = data.map((item) => new GetFavoriteRecipesItemDto(item));
  }
}
