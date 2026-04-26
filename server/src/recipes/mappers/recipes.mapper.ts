import { Injectable } from '@nestjs/common';
import { Recipe } from 'src/generated/prisma/client';
import { RecipeDto, RecipeDetailsResponseDto, RecipePreviewResponseDto } from '../dtos';
import { RecipeFull, RecipeListItem } from '../recipes.types';
import { transformImage } from 'src/common/utils/transform-image';

@Injectable()
export class RecipesMapper {
  toDto(recipe: Recipe): RecipeDto {
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      difficulty: recipe.difficulty,
      cookingTime: recipe.cookingTime,
      content: recipe.content,
      authorId: recipe.authorId,
      categoryId: recipe.categoryId,
      previewImage: transformImage(recipe.previewImage),
      viewsCount: recipe.viewsCount,
      ratingsCount: recipe.ratingsCount,
      ratingsAvg: Math.round(recipe.ratingsAvg * 10) / 10,
      createdAt: recipe.createdAt,
    };
  }

  toDetailsDto(
    recipe: RecipeFull,
    context: { isFavorite?: boolean; userRating?: number }
  ): RecipeDetailsResponseDto {
    const { category, recipeTags, recipeIngredients, author } = recipe;

    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      difficulty: recipe.difficulty,
      cookingTime: recipe.cookingTime,
      content: recipe.content,
      previewImage: transformImage(recipe.previewImage),
      viewsCount: recipe.viewsCount,
      ratingsCount: recipe.ratingsCount,
      ratingsAvg: Math.round(recipe.ratingsAvg * 10) / 10,
      createdAt: recipe.createdAt,
      authorId: recipe.authorId,
      author: {
        id: author.id,
        firstname: author.firstname,
        secondname: author.secondname,
        avatar: transformImage(author.avatar),
      },
      categoryId: recipe.categoryId,
      category: {
        id: category.id,
        name: category.name,
      },
      recipeTags: recipeTags.map((rt) => ({
        id: rt.tag.id,
        name: rt.tag.name,
      })),
      recipeIngredients: recipeIngredients.map((ri) => ({
        ingredientId: ri.ingredientId,
        name: ri.ingredient.name,
        amount: ri.amount,
        unit: ri.unit,
      })),
      ...context,
    };
  }

  toPreviewDto(
    recipe: RecipeListItem,
    context?: { isFavorite?: boolean }
  ): RecipePreviewResponseDto {
    const { category, recipeTags, recipeIngredients } = recipe;

    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      difficulty: recipe.difficulty,
      cookingTime: recipe.cookingTime,
      authorId: recipe.authorId,
      previewImage: transformImage(recipe.previewImage),
      viewsCount: recipe.viewsCount,
      ratingsCount: recipe.ratingsCount,
      ratingsAvg: Math.round(recipe.ratingsAvg * 10) / 10,
      createdAt: recipe.createdAt,
      categoryId: recipe.categoryId,
      category: {
        id: category.id,
        name: category.name,
      },
      recipeTags: recipeTags.map((rt) => ({
        id: rt.tag.id,
        name: rt.tag.name,
      })),
      recipeIngredients: recipeIngredients.map((ri) => ({
        ingredientId: ri.ingredientId,
        name: ri.ingredient.name,
        amount: ri.amount,
        unit: ri.unit,
      })),
      ...context,
    };
  }
}
