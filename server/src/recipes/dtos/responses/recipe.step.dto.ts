import { ApiProperty } from '@nestjs/swagger';

export class RecipeStepDto {
  @ApiProperty({
    description: 'Content of recipe step',
    example:
      'Conscendo fugiat absconditus utor laudantium acidus toties. Adaugeo deinde vitium aliquid. Utrum trado tracto. Cursus cui non suspendo terreo sollers.',
  })
  content: string;
}
