import { PaginatedResponseDto, RecipePreviewResponseDto } from 'src/recipes/dtos';
import { Favorite } from '../types';

export class GetFavoriteRecipesItemDto {
  id: string;
  userId: string;
  recipeId: string;
  favoritedAt: Date;
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
  data: GetFavoriteRecipesItemDto[];
  totalCount: number;
  totalPage: number;
  currentPage: number;

  constructor(partial: PaginatedResponseDto<Favorite>) {
    const { data, ...rest } = partial;

    Object.assign(this, rest);

    this.data = data.map((item) => new GetFavoriteRecipesItemDto(item));
  }
}
