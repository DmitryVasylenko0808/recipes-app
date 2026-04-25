import { Injectable } from '@nestjs/common';
import { Recipe } from 'src/generated/prisma/client';
import { RecipeDto, RecipeDetailsResponseDto, RecipePreviewResponseDto } from '../dtos';
import { RecipeFull, RecipeListItem } from '../recipes.types';

@Injectable()
export class RecipesMapper {
  toDto(recipe: Recipe): RecipeDto {
    const { previewImage, ratingsSum, ...data } = recipe;

    return { ...data, previewImage: `${process.env.SERVER_UPLOADS_URL}/${previewImage}` };
  }

  toDetailsDto(
    recipe: RecipeFull,
    context: { isFavorite?: boolean; userRating?: number }
  ): RecipeDetailsResponseDto {
    const {
      favoriteEntries,
      category,
      recipeTags,
      recipeIngredients,
      ratingsSum,
      ratingsAvg,
      previewImage,
      author,
      ratings,
      ...data
    } = recipe;

    return {
      ...data,
      ...context,
      previewImage: `${process.env.SERVER_UPLOADS_URL}/${previewImage}`,
      ratingsAvg: Math.round(ratingsAvg * 10) / 10,
      author: {
        id: author.id,
        firstname: author.firstname,
        secondname: author.secondname,
        avatar: author.avatar ? `${process.env.SERVER_UPLOADS_URL}/${author.avatar}` : null,
      },
      category: {
        id: category.id,
        name: category.name,
      },
      recipeTags: recipeTags.map((rt) => ({
        id: rt.tag.id,
        name: rt.tag.name,
        tagId: rt.tagId,
        recipeId: rt.recipeId,
      })),
      recipeIngredients: recipeIngredients.map((ri) => ({
        id: ri.id,
        ingredientId: ri.ingredientId,
        recipeId: ri.recipeId,
        name: ri.ingredient.name,
        amount: ri.amount,
        unit: ri.unit,
      })),
    };
  }

  toPreviewDto(
    recipe: RecipeListItem,
    context?: { isFavorite?: boolean }
  ): RecipePreviewResponseDto {
    const {
      favoriteEntries,
      category,
      recipeTags,
      recipeIngredients,
      previewImage,
      content,
      ratingsSum,
      ratingsAvg,
      ...data
    } = recipe;

    return {
      ...data,
      ...context,
      previewImage: `${process.env.SERVER_UPLOADS_URL}/${previewImage}`,
      ratingsAvg: Math.round(ratingsAvg * 10) / 10,
      category: {
        id: category.id,
        name: category.name,
      },
      recipeTags: recipeTags.map((rt) => ({
        id: rt.tag.id,
        name: rt.tag.name,
        tagId: rt.tagId,
        recipeId: rt.recipeId,
      })),
      recipeIngredients: recipeIngredients.map((ri) => ({
        id: ri.id,
        ingredientId: ri.ingredientId,
        recipeId: ri.recipeId,
        name: ri.ingredient.name,
        amount: ri.amount,
        unit: ri.unit,
      })),
    };
  }
}
