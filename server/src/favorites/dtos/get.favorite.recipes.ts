import { PaginatedResponseDto } from 'src/common/interfaces/paginated.response.dto';
import { FavoriteRecipeDto } from './favorite.recipe.dto';

export class GetFavoriteRecipesDto extends PaginatedResponseDto<FavoriteRecipeDto> {}
