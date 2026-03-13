import { Recipe } from 'src/generated/prisma/client';
import {
  GetRecipesQueryDto,
  GetAuthorRecipesQueryDto,
  CreateRecipeRequestDto,
  UpdateRecipeRequestDto,
} from '../dtos';
import { RecipeDetails, RecipeFindManyResult } from '../recipes.types';

export interface IRecipesRepository {
  findById(id: string): Promise<RecipeDetails | null>;
  findMany(options: GetRecipesQueryDto): Promise<RecipeFindManyResult>;
  findManyByAuthorId(
    authorId: string,
    options: GetAuthorRecipesQueryDto
  ): Promise<RecipeFindManyResult>;
  create(
    authorId: string,
    data: CreateRecipeRequestDto,
    previewImageFilename: string
  ): Promise<Recipe>;
  update(id: string, data: UpdateRecipeRequestDto): Promise<Recipe>;
  delete(id: string): Promise<Recipe>;
}
