import { RecipeFindManyResult } from '../recipes.types';
import { PaginatedResponseDto } from './paginated.response.dto';
import { RecipePreviewResponseDto } from './recipe.preview.response.dto';

export class GetRecipesResponseDto implements PaginatedResponseDto<RecipePreviewResponseDto> {
  data: RecipePreviewResponseDto[];
  totalCount: number;
  totalPage: number;
  currentPage: number;

  constructor(partial: Partial<RecipeFindManyResult>) {
    const { data, ...other } = partial;

    Object.assign(this, other);

    this.data = data?.map((r) => new RecipePreviewResponseDto(r)) || [];
  }
}
