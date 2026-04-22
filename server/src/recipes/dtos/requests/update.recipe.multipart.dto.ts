import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateRecipeRequestDto } from './create.recipe.request.dto';

export class UpdateRecipeRequestMultipartDto extends CreateRecipeRequestDto {
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  previewImage: any;
}
