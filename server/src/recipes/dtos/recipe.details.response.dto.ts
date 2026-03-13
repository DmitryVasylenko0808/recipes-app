import { AuthorPreviewDto } from 'src/authors/dtos/author.preview.dto';
import { Difficulty } from 'src/generated/prisma/enums';
import { RecipeDetails, RecipeIngredientDetails } from '../recipes.types';
import { RecipeTagDto } from './recipe.tag.dto';
import { Exclude } from 'class-transformer';

export class RecipeDetailsResponseDto {
  id: string;
  title: string;
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
    const { recipeTags, recipeIngredients, author, ...data } = partial;

    Object.assign(this, data);

    this.author = new AuthorPreviewDto(author);
    this.recipeTags = recipeTags.map((rt) => new RecipeTagDto(rt));
    this.recipeIngredients = recipeIngredients.map((ing) => new RecipeIngredientDetailsDto(ing));
  }
}

class RecipeIngredientDetailsDto {
  @Exclude()
  id: string;

  @Exclude()
  recipeId: string;

  ingredientId: string;
  name: string;
  amount: number;
  unit: string;

  constructor(partial: Partial<RecipeIngredientDetails>) {
    const { ingredient, ...restData } = partial;
    Object.assign(this, restData, ingredient);
  }
}
