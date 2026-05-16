import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecipeVersionResponseDto {
  @ApiProperty({
    description: 'Unique identifier of recipe version',
    example: '74bd30be-3d72-4f27-9609-38ec711d34f1',
  })
  id: string;

  @ApiProperty({
    description: 'Date of creating recipe version',
    example: '2026-05-16T14:54:39.535Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Unique identifier of recipe',
    example: '74bd30be-3d72-4f27-9609-38ec711d34f1',
  })
  recipeId: string;

  @ApiProperty({ description: 'Version of recipe' })
  version: number;

  @ApiPropertyOptional({ description: 'Change description of recipe' })
  changeDescription?: string | null;

  @ApiPropertyOptional({ description: 'Show true if recipe version is current' })
  isCurrent?: boolean;
}
