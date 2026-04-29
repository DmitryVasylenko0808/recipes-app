import { ApiProperty } from '@nestjs/swagger';

export class RecipeStepDto {
  @ApiProperty({
    description: 'Unique identifier of recipe step',
    example: 'a3000f7f-f7b6-4549-a910-b1e22d422788',
  })
  id: string;

  @ApiProperty({
    description: 'Unique identifier of recipe step',
    example: 'aa226b9c-e9e3-4066-8ef7-ddb55639cd51',
  })
  recipeId: string;

  @ApiProperty({
    description: 'Content of recipe step',
    example:
      'Conscendo fugiat absconditus utor laudantium acidus toties. Adaugeo deinde vitium aliquid. Utrum trado tracto. Cursus cui non suspendo terreo sollers.',
  })
  content: string;
}
