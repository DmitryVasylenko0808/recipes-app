import { RecipeFindManyItem } from '../recipes.types';
import { RecipePreviewResponseDto } from './recipe.preview.response.dto';

export class GetPopularRecipesResponseDto {
  data: RecipePreviewResponseDto[];

  constructor(data: RecipeFindManyItem[]) {
    this.data = data.map((item) => new RecipePreviewResponseDto(item));
  }
}
