import { Type, Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  IsInt,
  IsEnum,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipeIngredientDto } from './recipe.ingredient.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRecipeRequestDto {
  @ApiProperty({
    description: 'Title of recipe',
    example: 'Spaghetti carbonara',
  })
  @IsString({ message: 'Invalid title' })
  @MinLength(1, { message: 'Title must contain at least $constraint1 characters' })
  readonly title: string;

  @ApiProperty({
    description: 'Unique identifier of category',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  @IsString({ message: 'Invalid category' })
  readonly categoryId: string;

  @ApiProperty({
    description: 'Short description of recipe',
    example: 'Classic Italian pasta dish with creamy egg sauce, crispy bacon, and parmesan cheese.',
  })
  @IsString({ message: 'Invalid description' })
  @MinLength(1, { message: 'Description must contain at least $constraint1 characters' })
  readonly description: string;

  @ApiProperty({
    description: 'Content of recipe in markdown (.md)',
    example: `# Meo veniam requirere adesto
              ## Se et dixit Andraemone
              Lorem markdownum **in imagine dives**. Da vocat, praebet vanos virgineumque.
            Intonuit attritas deae; adspice *catulus matremque questus* metallis ponit
            dicitur crinem! Quanto cornibus aliquid dixit imis inpetus mora declivibus
            vires.`,
  })
  @IsString({ message: 'Invalid content' })
  @MinLength(1, { message: 'Description must contain at least $constraint1 characters' })
  readonly content: string;

  @ApiProperty({
    description: 'Cooking time of recipe. In minutes',
    example: 30,
  })
  @IsInt({ message: 'Invalid cooking time' })
  @Type(() => Number)
  readonly cookingTime: number;

  @ApiProperty({
    description: 'Difficulty of recipe',
    example: Difficulty.medium,
    enum: Difficulty,
  })
  @IsEnum(Difficulty, { message: 'Invalid difficulty' })
  readonly difficulty: Difficulty;

  @ApiPropertyOptional({
    description: 'Tag ids of recipe',
    examples: ['43dff760-fe8e-4f60-9dda-e593e924ebda', '811909ef-1ac8-4197-b674-05737d68b4a6'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  })
  @IsString({ each: true })
  readonly recipeTagIds: string[];

  @ApiPropertyOptional({
    description: 'Ingredients of recipe',
    examples: [
      { ingredientId: '20695ca1-2b44-4909-9665-4fba19af86a8', amount: 2, unit: 'pcs' },
      { ingredientId: '58bbd258-ec7c-4e34-b16d-2539d69a9e48', amount: 1, unit: 'l' },
    ],
    type: [RecipeIngredientDto],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientDto)
  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  })
  recipeIngredients: RecipeIngredientDto[];
}
