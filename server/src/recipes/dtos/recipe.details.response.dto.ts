import { AuthorPreviewDto } from 'src/authors/dtos/author.preview.dto';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipeDetails } from '../recipes.types';
import { RecipeTagDto } from './recipe.tag.dto';
import { CategoryDto } from 'src/categories/dtos';
import { RecipeIngredientDetailsDto } from './recipe.ingredient.details.dto';

export class RecipeDetailsResponseDto {
  id: string;
  title: string;
  categoryId: string;
  category: CategoryDto;
  description: string;
  //   @Transform((value) => `${process.env.SERVER_UPLOADS_URL}/${value}`)
  previewImage: string;
  content: string;
  cookingTime: number;
  difficulty: Difficulty;
  createdAt: Date;
  authorId: string;
  author: AuthorPreviewDto;
  recipeTags: RecipeTagDto[];
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
