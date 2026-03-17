import { ApiProperty } from '@nestjs/swagger';
import { RecipeFindManyResult } from '../recipes.types';
import { PaginatedResponseDto } from './paginated.response.dto';
import { RecipePreviewResponseDto } from './recipe.preview.response.dto';

export class GetRecipesResponseDto implements PaginatedResponseDto<RecipePreviewResponseDto> {
  @ApiProperty({ type: [RecipePreviewResponseDto] })
  data: RecipePreviewResponseDto[];

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  currentPage: number;

  constructor(partial: Partial<RecipeFindManyResult>) {
    const { data, ...other } = partial;

    Object.assign(this, other);

    this.data = data?.map((r) => new RecipePreviewResponseDto(r)) || [];
  }
}
