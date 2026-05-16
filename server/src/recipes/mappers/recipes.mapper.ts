import { Injectable } from '@nestjs/common';
import { Recipe } from 'src/generated/prisma/client';
import { RecipeDto, RecipeDetailsResponseDto, RecipePreviewResponseDto } from '../dtos';
import { RecipeFullSafe, RecipeListItemSafe } from '../recipes.types';
import { transformImage } from 'src/common/utils/transform-image';

@Injectable()
export class RecipesMapper {
  toDto(recipe: Recipe): RecipeDto {
    return {
      id: recipe.id,
      authorId: recipe.authorId,
      viewsCount: recipe.viewsCount,
      ratingsCount: recipe.ratingsCount,
      ratingsAvg: Math.round(recipe.ratingsAvg * 10) / 10,
      createdAt: recipe.createdAt,
    };
  }

  toDetailsDto(
    recipe: RecipeFullSafe,
    context: { isFavorite?: boolean; userRating?: number }
  ): RecipeDetailsResponseDto {
    return {
      id: recipe.id,
      title: recipe.currentVersion.title,
      description: recipe.currentVersion.description,
      difficulty: recipe.currentVersion.difficulty,
      cookingTime: recipe.currentVersion.cookingTime,
      previewImage: transformImage(recipe.currentVersion.previewImage),
      viewsCount: recipe.viewsCount,
      ratingsCount: recipe.ratingsCount,
      ratingsAvg: Math.round(recipe.ratingsAvg * 10) / 10,
      createdAt: recipe.createdAt,
      authorId: recipe.authorId,
      author: {
        id: recipe.author.id,
        firstname: recipe.author.firstname,
        secondname: recipe.author.secondname,
        avatar: transformImage(recipe.author.avatar),
      },
      categoryId: recipe.currentVersion.categoryId,
      category: {
        id: recipe.currentVersion.category.id,
        name: recipe.currentVersion.category.name,
      },
      recipeSteps: recipe.currentVersion.recipeSteps.map((rStep) => rStep.content),
      recipeTags: recipe.currentVersion.recipeTags.map((rt) => ({
        id: rt.tag.id,
        name: rt.tag.name,
      })),
      recipeIngredients: recipe.currentVersion.recipeIngredients.map((ri) => ({
        ingredientId: ri.ingredientId,
        name: ri.ingredient.name,
        amount: ri.amount,
        unit: ri.unit,
      })),
      ...context,
    };
  }

  toPreviewDto(
    recipe: RecipeListItemSafe,
    context?: { isFavorite?: boolean }
  ): RecipePreviewResponseDto {
    return {
      id: recipe.id,
      title: recipe.currentVersion.title,
      description: recipe.currentVersion.description,
      difficulty: recipe.currentVersion.difficulty,
      cookingTime: recipe.currentVersion.cookingTime,
      authorId: recipe.authorId,
      previewImage: transformImage(recipe.currentVersion.previewImage),
      viewsCount: recipe.viewsCount,
      ratingsCount: recipe.ratingsCount,
      ratingsAvg: Math.round(recipe.ratingsAvg * 10) / 10,
      createdAt: recipe.createdAt,
      categoryId: recipe.currentVersion.categoryId,
      category: {
        id: recipe.currentVersion.category.id,
        name: recipe.currentVersion.category.name,
      },
      recipeTags: recipe.currentVersion.recipeTags.map((rt) => ({
        id: rt.tag.id,
        name: rt.tag.name,
      })),
      recipeIngredients: recipe.currentVersion.recipeIngredients.map((ri) => ({
        ingredientId: ri.ingredientId,
        name: ri.ingredient.name,
        amount: ri.amount,
        unit: ri.unit,
      })),
      ...context,
    };
  }
}
