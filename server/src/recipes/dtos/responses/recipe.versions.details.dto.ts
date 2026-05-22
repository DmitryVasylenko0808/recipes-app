import { RecipeVersionResponseDto } from './recipe.versions.response.dto';
import { RecipeVersionContentResponseDto } from './recipe.version.content.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeVersionDetailsResponseDto {
  @ApiProperty({ description: 'Data of version' })
  version: RecipeVersionResponseDto;

  @ApiProperty({ description: 'Data of recipe' })
  recipe: RecipeVersionContentResponseDto;
}
