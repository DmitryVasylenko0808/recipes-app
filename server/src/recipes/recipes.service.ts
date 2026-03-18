import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RecipesRepository } from './recipes.repository';
import {
  GetRecipesQueryDto,
  GetAuthorRecipesQueryDto,
  CreateRecipeRequestDto,
  UpdateRecipeRequestDto,
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

  async create(authorId: string, dto: CreateRecipeRequestDto, previewImageFilename: string) {
    return await this.recipesRepository.create(authorId, dto, previewImageFilename);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateRecipeRequestDto,
    previewImageFilename?: string
  ) {
    const existedRecipe = await this.recipesRepository.findById(id);

    if (!existedRecipe) throw new NotFoundException('Cannot update non-existed recipe');
    if (existedRecipe.authorId !== userId)
      throw new ForbiddenException('Cannot update, you`re not author of this recipe');

    return await this.recipesRepository.update(id, dto, previewImageFilename);
  }

  async delete(id: string) {
    const existedRecipe = await this.recipesRepository.findById(id);

    if (!existedRecipe) throw new NotFoundException('Cannot delete non-existed recipe');

    return await this.recipesRepository.delete(id);
  }
}
