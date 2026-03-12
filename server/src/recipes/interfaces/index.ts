import { Author, Difficulty, Recipe, RecipeTag, Tag } from 'src/generated/prisma/client';
import {
  RecipeCreateInput,
  RecipeTagInclude,
  RecipeTagOmit,
  RecipeUpdateInput,
} from 'src/generated/prisma/models';
import { CreateRecipeDto, GetAuthorRecipesQueryDto, GetRecipesQueryDto } from '../dtos';

export type RecipeFindManyOptions = {
  tagsId?: string[];
  cookingTime?: number;
  difficulty?: Difficulty;
  search?: string;
  page?: number;
  limit?: number;
};
export type CreateRecipeData = RecipeCreateInput;
export type UpdateRecipeData = RecipeUpdateInput;

export type RecipeTagDetails = RecipeTag & { tag: Tag };

export type RecipePreview = Recipe & {
  recipeTags: Array<RecipeTagDetails>;
};
export type RecipeFindManyResult = {
  data: RecipePreview[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export type RecipeDetails = Recipe & {
  author: Author;
  recipeTags: Array<RecipeTagDetails>;
};

export interface IRecipesRepository {
  findById(id: string): Promise<RecipeDetails | null>;
  findMany(options: GetRecipesQueryDto): Promise<RecipeFindManyResult>;
  findManyByAuthorId(
    authorId: string,
    options: GetAuthorRecipesQueryDto
  ): Promise<RecipeFindManyResult>;
  create(authorId: string, data: CreateRecipeDto): Promise<Recipe>;
  update(data: UpdateRecipeData): Promise<Recipe>;
  delete(id: string): Promise<Recipe>;
}
