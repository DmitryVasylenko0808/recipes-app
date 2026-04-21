import { AuthorPreviewDto } from 'src/authors/dtos/author.preview.dto';
import { Difficulty } from 'src/generated/prisma/enums';
import { FavoriteEntryItem, RecipeDetails } from '../recipes.types';
import { RecipeTagDto } from './recipe.tag.dto';
import { CategoryDto } from 'src/categories/dtos';
import { RecipeIngredientDetailsDto } from './recipe.ingredient.details.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

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
    description: 'Show how many users viewed recipe',
    example: 50,
  })
  viewsCount: number;

  @ApiProperty({
    description: 'Show how many users rated recipe',
    example: 20,
  })
  ratingsCount: number;

  @Exclude()
  ratingsSum: number;

  @ApiProperty({
    description: 'Average rating of recipe',
    example: 4.5,
  })
  @Transform(({ value }) => Math.round(value * 10) / 10)
  ratingsAvg: number;

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

  @ApiPropertyOptional({
    description: 'Determines if recipe is favorited by current user',
    example: false,
  })
  isFavorite?: boolean;

  @ApiProperty({ type: AuthorPreviewDto })
  author: AuthorPreviewDto;

  @ApiProperty({ type: [RecipeTagDto] })
  recipeTags: RecipeTagDto[];

  @ApiProperty({ type: [RecipeIngredientDetailsDto] })
  recipeIngredients: RecipeIngredientDetailsDto[];

  @Exclude()
  favoriteEntries?: FavoriteEntryItem[];

  constructor(partial: RecipeDetails) {
    const { category, recipeTags, recipeIngredients, author, isFavorite, ...data } = partial;

    Object.assign(this, data);

    this.category = new CategoryDto(category);
    this.author = new AuthorPreviewDto(author);
    this.isFavorite = isFavorite;
    this.recipeTags = recipeTags.map((rt) => new RecipeTagDto(rt));
    this.recipeIngredients = recipeIngredients.map((ing) => new RecipeIngredientDetailsDto(ing));
  }
}
