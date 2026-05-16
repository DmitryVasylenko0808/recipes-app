import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RecipesRepository } from '../repositories/recipes.repository';
import {
  GetRecipesQueryDto,
  GetAuthorRecipesQueryDto,
  CreateRecipeRequestDto,
  UpdateRecipeRequestDto,
  PaginationQueryDto,
} from '../dtos';
import {
  RecipeListItem,
  RecipeFull,
  RecipeFullSafe,
  RecipeListItemSafe,
  RecipeVersionListItem,
} from '../recipes.types';
import { getMonthRange } from '../utils/get.months.range';
import { RecipesMapper } from '../mappers/recipes.mapper';
import { assertHasCurrentVersion } from '../utils/assert-has-current-version';
import { validRecipes } from '../utils/valid-recipes';
import { paginated } from 'src/common/utils/paginated';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipesRepository: RecipesRepository,
    private readonly recipesMapper: RecipesMapper
  ) {}

  async getAll(options: GetRecipesQueryDto, userId?: string) {
    const { data, totalCount } = await this.recipesRepository.findMany(options, userId);

    return {
      data: validRecipes(data).map((r) =>
        this.recipesMapper.toPreviewDto(r, { isFavorite: this.isFavorite(r) })
      ),
      totalCount,
      totalPages: Math.ceil(totalCount / options.limit),
      currentPage: options.page,
    };
  }

  async getTrending(userId?: string) {
    const rangeDate = getMonthRange(1);

    const data = await this.recipesRepository.findTrending(4, rangeDate, userId);

    return validRecipes(data).map((r) =>
      this.recipesMapper.toPreviewDto(r, { isFavorite: this.isFavorite(r) })
    );
  }

  async getPopular(userId?: string) {
    const data = await this.recipesRepository.findPopular(4, userId);

    return validRecipes(data).map((r) =>
      this.recipesMapper.toPreviewDto(r, { isFavorite: this.isFavorite(r) })
    );
  }

  async getByAuthorId(authorId: string, options: GetAuthorRecipesQueryDto, userId?: string) {
    const { data, totalCount } = await this.recipesRepository.findManyByAuthorId(
      authorId,
      options,
      userId
    );

    return {
      data: validRecipes(data).map((r) =>
        this.recipesMapper.toPreviewDto(r, { isFavorite: this.isFavorite(r) })
      ),
      totalCount,
      totalPages: Math.ceil(totalCount / options.limit),
      currentPage: options.page,
    };
  }

  async getOneById(id: string, userId?: string) {
    const recipe = await this.recipesRepository.findById(id, userId);

    if (!recipe) throw new NotFoundException('Recipe is not found');

    assertHasCurrentVersion(recipe);

    return this.recipesMapper.toDetailsDto(recipe, {
      isFavorite: this.isFavorite(recipe),
      userRating: recipe.ratings?.[0]?.value,
    });
  }

  async getSimilar(id: string, userId?: string) {
    const recipe = await this.recipesRepository.findById(id);

    if (!recipe) return [];

    assertHasCurrentVersion(recipe);

    const recipesByCategory = await this.recipesRepository.findByCategoryId(
      recipe.currentVersion.categoryId,
      userId
    );
    const recipesByCategorySafe = validRecipes(recipesByCategory);

    const data = this.getMostSimilar(recipe, recipesByCategorySafe, 3);

    return data.map((r) => this.recipesMapper.toPreviewDto(r, { isFavorite: this.isFavorite(r) }));
  }

  private getMostSimilar(
    recipe: RecipeListItemSafe | RecipeFullSafe,
    recipesByCategory: RecipeListItemSafe[],
    limit: number
  ): RecipeListItemSafe[] {
    const recipeTagIds = new Set(recipe.currentVersion.recipeTags.map((t) => t.tagId));
    const recipeIngredientIds = new Set(
      recipe.currentVersion!.recipeIngredients.map((ing) => ing.ingredientId)
    );

    const result = recipesByCategory.map((r) => {
      const tagsSimilarity = r.currentVersion.recipeTags.reduce(
        (acc, curr) => (acc += recipeTagIds.has(curr.tagId) ? 0.5 : 0),
        0
      );
      const ingredientsSimilarity = r.currentVersion.recipeIngredients.reduce(
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
    const recipe = await this.recipesRepository.create(authorId, dto, previewImageFilename);

    return this.recipesMapper.toDto(recipe);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateRecipeRequestDto,
    previewImageFilename?: string
  ) {
    const recipe = await this.recipesRepository.findById(id);

    if (!recipe) throw new NotFoundException('Cannot update non-existed recipe');
    if (recipe.authorId !== userId)
      throw new ForbiddenException('Cannot update, you`re not author of the recipe');

    assertHasCurrentVersion(recipe);

    const updatedRecipe = await this.recipesRepository.addVersionAndSetCurrent(recipe.id, {
      ...dto,
      previewImageFilename: previewImageFilename
        ? previewImageFilename
        : recipe.currentVersion.previewImage,
    });

    return this.recipesMapper.toDto(updatedRecipe);
  }

  async delete(id: string) {
    const existedRecipe = await this.recipesRepository.findById(id);

    if (!existedRecipe) throw new NotFoundException('Cannot delete non-existed recipe');

    const recipe = await this.recipesRepository.delete(id);

    return this.recipesMapper.toDto(recipe);
  }

  async incrementViews(id: string) {
    await this.recipesRepository.incrementViews(id);
  }

  async getVersions(recipeId: string, options: PaginationQueryDto) {
    const recipe = await this.recipesRepository.findById(recipeId);

    if (!recipe) throw new NotFoundException('Recipe is not found');

    const { data, totalCount } = await this.recipesRepository.findVersionsAndCount(
      recipe.id,
      options
    );

    return paginated({
      data: data.map((rv) =>
        this.recipesMapper.toVersionDto(rv, { isCurrent: this.isCurrentVersion(recipeId, rv) })
      ),
      page: options.page,
      limit: options.limit,
      totalCount,
    });
  }

  private isFavorite(r: RecipeListItem | RecipeFull) {
    return r.favoriteEntries && r.favoriteEntries?.length > 0;
  }

  private isCurrentVersion(recipeId: string, recipeVersion: RecipeVersionListItem) {
    return recipeVersion.currentRecipeOf?.id === recipeId;
  }
}
