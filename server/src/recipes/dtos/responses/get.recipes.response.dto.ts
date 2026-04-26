import { RecipePreviewResponseDto } from './recipe.preview.response.dto';
import { PaginatedResponseDto } from 'src/common/interfaces/paginated.response.dto';

export class GetRecipesResponseDto extends PaginatedResponseDto<RecipePreviewResponseDto> {}
