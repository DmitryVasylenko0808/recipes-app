import { ApiProperty } from '@nestjs/swagger';
import { CreateRecipeRequestDto } from './create.recipe.request.dto';

export class CreateRecipeRequestMultipartDto extends CreateRecipeRequestDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  previewImage: any;
}
