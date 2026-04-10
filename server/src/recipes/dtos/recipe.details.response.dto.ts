import { AuthorPreviewDto } from 'src/authors/dtos/author.preview.dto';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipeDetails } from '../recipes.types';
import { RecipeTagDto } from './recipe.tag.dto';
import { CategoryDto } from 'src/categories/dtos';
import { RecipeIngredientDetailsDto } from './recipe.ingredient.details.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RecipeDetailsResponseDto {
  @ApiProperty({
    description: 'Unique identifier of recipe',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: 'Title of recipe',
    example: 'Spaghetti carbonara',
  })
  title: string;

  @ApiProperty({
    description: 'Unique identifier of category',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  categoryId: string;

  @ApiProperty({ type: CategoryDto, description: 'Category data' })
  category: CategoryDto;

  @ApiProperty({
    description: 'Short description of recipe',
    example: 'Classic Italian pasta dish with creamy egg sauce, crispy bacon, and parmesan cheese.',
  })
  description: string;

  @ApiProperty({
    description: 'Preview image of recipe',
    example:
      'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22884%22%20height%3D%22970%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%2358ced2%22%2F%3E%3Ctext%20x%3D%22442%22%20y%3D%22485%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E884x970%3C%2Ftext%3E%3C%2Fsvg%3E',
  })
  @Transform(({ value }) => `${process.env.SERVER_UPLOADS_URL}/${value}`)
  previewImage: string;

  @ApiProperty({
    description: 'Content of recipe in markdown (.md)',
    example: `# Meo veniam requirere adesto
              ## Se et dixit Andraemone
              Lorem markdownum **in imagine dives**. Da vocat, praebet vanos virgineumque.
            Intonuit attritas deae; adspice *catulus matremque questus* metallis ponit
            dicitur crinem! Quanto cornibus aliquid dixit imis inpetus mora declivibus
            vires.`,
  })
  content: string;

  @ApiProperty({
    description: 'Cookint time of recipe. In minutes',
    example: 30,
  })
  cookingTime: number;

  @ApiProperty({
    description: 'Difficulty of recipe',
    example: Difficulty.medium,
    enum: Difficulty,
  })
  difficulty: Difficulty;

  @ApiProperty({
    description: 'Published date of recipe',
    example: '2024-11-01T02:14:34.244Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Unique identifier of author',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  authorId: string;

  @ApiProperty({ type: AuthorPreviewDto })
  author: AuthorPreviewDto;

  @ApiProperty({ type: [RecipeTagDto] })
  recipeTags: RecipeTagDto[];

  @ApiProperty({ type: [RecipeIngredientDetailsDto] })
  recipeIngredients: RecipeIngredientDetailsDto[];

  constructor(partial: RecipeDetails) {
    const { category, recipeTags, recipeIngredients, author, ...data } = partial;

    Object.assign(this, data);

    this.category = new CategoryDto(category);
    this.author = new AuthorPreviewDto(author);
    this.recipeTags = recipeTags.map((rt) => new RecipeTagDto(rt));
    this.recipeIngredients = recipeIngredients.map((ing) => new RecipeIngredientDetailsDto(ing));
  }
}
