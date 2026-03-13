import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipesRepository } from './recipes.repository';
import {
  CreateRecipeDto,
  GetAuthorRecipesQueryDto,
  GetRecipesQueryDto,
  UpdateRecipeDto,
} from './dtos';

@Injectable()
export class RecipesService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async getAll(options: GetRecipesQueryDto) {
    const recipes = await this.recipesRepository.findMany(options);

    return recipes;
  }

  async getByAuthorId(authorId: string, options: GetAuthorRecipesQueryDto) {
    const recipes = await this.recipesRepository.findManyByAuthorId(authorId, options);

    return recipes;
  }

  async getOneById(id: string) {
    const recipe = await this.recipesRepository.findById(id);

    if (!recipe) throw new NotFoundException('Recipe is not found');

    return recipe;
  }

  async create(authorId: string, dto: CreateRecipeDto) {
    return await this.recipesRepository.create(authorId, dto);
  }

  async update(id: string, dto: UpdateRecipeDto) {
    const existedRecipe = await this.recipesRepository.findById(id);

    if (!existedRecipe) throw new NotFoundException('Cannot update non-existed recipe');

    const recipe = await this.recipesRepository.update(id, dto);

    return recipe;
  }
}
