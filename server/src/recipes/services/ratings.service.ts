import { BadRequestException, Injectable } from '@nestjs/common';
import { RecipesRepository } from '../repositories/recipes.repository';
import { RatingsRepository } from '../repositories/ratings.repository';
import { RateRecipeRequestDto } from '../dtos/requests/rate.recipe.request.dto';
import { RateStats } from '../recipes.types';
import { Rating, Recipe } from 'src/generated/prisma/client';

@Injectable()
export class RatingsService {
  constructor(
    private readonly recipesRepository: RecipesRepository,
    private readonly ratingsRepository: RatingsRepository
  ) {}

  async rateRecipe(userId: string, recipeId: string, data: RateRecipeRequestDto) {
    const recipe = await this.recipesRepository.findById(recipeId);

    if (!recipe) throw new BadRequestException('Cannot rate non-existed recipe');

    const rating = await this.ratingsRepository.findOne(userId, recipeId);

    const rateStats: Partial<RateStats> = this.updateRateStats(recipe, data.value, rating);

    const [_, result] = await Promise.all([
      this.recipesRepository.updateRateStats(recipeId, rateStats),
      this.ratingsRepository.upsert(userId, recipeId, data.value),
    ]);

    return result;
  }

  private updateRateStats(
    recipe: Recipe,
    value: number,
    rating?: Rating | null
  ): Partial<RateStats> {
    if (rating) {
      const ratingsSum = recipe.ratingsSum - rating.value + value;
      const ratingsAvg = ratingsSum / recipe.ratingsCount;

      return { ratingsSum, ratingsAvg };
    }

    const ratingsCount = recipe.ratingsCount + 1;
    const ratingsSum = recipe.ratingsSum + value;
    const ratingsAvg = ratingsSum / ratingsCount;

    return { ratingsCount, ratingsSum, ratingsAvg };
  }
}
