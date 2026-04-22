import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RecipesRepository } from './recipes.repository';
import {
  GetRecipesQueryDto,
  GetAuthorRecipesQueryDto,
  CreateRecipeRequestDto,
  UpdateRecipeRequestDto,
} from './dtos';
import { RecipeFindManyItem, RecipeFindOneResult, RecipePreview } from './recipes.types';
import { getMonthRange } from './utils/get.months.range';

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

  async getTrending(userId?: string) {
    const rangeDate = getMonthRange(1);

    const data = await this.recipesRepository.findTrending(4, rangeDate, userId);

    return data.map((r) => ({ ...r, isFavorite: this.isFavorite(r) }));
  }

  async getPopular(userId?: string) {
    const data = await this.recipesRepository.findPopular(4, userId);

    return data.map((r) => ({ ...r, isFavorite: this.isFavorite(r) }));
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

  async getSimilar(id: string, userId?: string) {
    const recipe = await this.recipesRepository.findById(id);

    if (!recipe) return [];

    const recipesByCategory = await this.recipesRepository.findByCategoryId(
      recipe.categoryId,
      userId
    );

    const similarRecipes = this.getMostSimilar(recipe, recipesByCategory, 3);

    return similarRecipes.map((r) => ({ ...r, isFavorite: this.isFavorite(r) }));
  }

  private getMostSimilar(
    recipe: RecipeFindManyItem | RecipeFindOneResult,
    recipesByCategory: RecipeFindManyItem[],
    limit: number
  ): RecipeFindManyItem[] {
    const recipeTagIds = new Set(recipe.recipeTags.map((t) => t.tagId));
    const recipeIngredientIds = new Set(recipe.recipeIngredients.map((ing) => ing.ingredientId));

    const result = recipesByCategory.map((r) => {
      const tagsSimilarity = r.recipeTags.reduce(
        (acc, curr) => (acc += recipeTagIds.has(curr.tagId) ? 0.5 : 0),
        0
      );
      const ingredientsSimilarity = r.recipeIngredients.reduce(
        (acc, curr) => (acc += recipeIngredientIds.has(curr.ingredientId) ? 1 : 0),
        0
      );

      return { ...r, similarity: tagsSimilarity + ingredientsSimilarity };
    });

    return result
      .sort((a, b) => b.similarity - a.similarity)
      .filter((r) => r.id !== recipe.id)
      .splice(0, limit)
      .map((r) => {
        const { similarity, ...rest } = r;
        return rest;
      });
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
