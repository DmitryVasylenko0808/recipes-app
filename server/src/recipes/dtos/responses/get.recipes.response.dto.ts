import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from './paginated.response.dto';
import { RecipePreviewResponseDto } from './recipe.preview.response.dto';

export class GetRecipesResponseDto implements PaginatedResponseDto<RecipePreviewResponseDto> {
  @ApiProperty({ type: [RecipePreviewResponseDto] })
  data: RecipePreviewResponseDto[];

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;
}
