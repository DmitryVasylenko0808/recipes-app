import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RecipesRepository } from './recipes.repository';
import {
  GetRecipesQueryDto,
  GetAuthorRecipesQueryDto,
  CreateRecipeRequestDto,
  UpdateRecipeRequestDto,
} from './dtos';
import { RecipeFindManyItem, RecipeFindOneResult } from './recipes.types';

@Injectable()
export class RecipesService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async getAll(options: GetRecipesQueryDto, userId?: string) {
    const { data, totalCount } = await this.recipesRepository.findMany(options, userId);

    return {
      data: data.map((r) => ({ ...r, isFavorite: this.isFavorite(r) })),
      totalCount,
      totalPages: Math.ceil(totalCount / options.limit),
      currentPage: options.page,
    };
  }

  async getByAuthorId(authorId: string, options: GetAuthorRecipesQueryDto, userId?: string) {
    const { data, totalCount } = await this.recipesRepository.findManyByAuthorId(
      authorId,
      options,
      userId
    );

    return {
      data: data.map((r) => ({ ...r, isFavorite: this.isFavorite(r) })),
      totalCount,
      totalPages: Math.ceil(totalCount / options.limit),
      currentPage: options.page,
    };
  }

  async getOneById(id: string, userId?: string) {
    const recipe = await this.recipesRepository.findById(id, userId);

    if (!recipe) throw new NotFoundException('Recipe is not found');

    return {
      ...recipe,
      isFavorite: this.isFavorite(recipe),
      userRating: recipe.ratings?.[0]?.value,
    };
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

  async incrementViews(id: string) {
    await this.recipesRepository.incrementViews(id);
  }

  private isFavorite(r: RecipeFindManyItem | RecipeFindOneResult) {
    return r.favoriteEntries && r.favoriteEntries?.length > 0;
  }
}
