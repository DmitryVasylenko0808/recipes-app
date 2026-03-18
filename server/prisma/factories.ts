import { faker } from '@faker-js/faker';
import { Author, Category, Recipe, Tag } from 'src/generated/prisma/client';
import { Difficulty } from 'src/generated/prisma/enums';
import {
  AuthorCreateInput,
  RecipeUncheckedCreateInput,
  TagCreateInput,
  IngredientCreateInput,
  RecipeIngredientUncheckedCreateInput,
} from 'src/generated/prisma/models';
import * as bcrypt from 'bcrypt';

export const createAuthor = (overwrites: Partial<Author> = {}): AuthorCreateInput => {
  const {
    email = faker.internet.email(),
    firstname = faker.person.firstName(),
    secondname = faker.person.lastName(),
    bio = faker.helpers.maybe(() => faker.person.bio(), { probability: 0.5 }),
    avatar = faker.helpers.maybe(() => faker.image.avatar(), { probability: 0.5 }),
    createdAt = faker.date.past({ years: 2 }),
    passwordHash = '11111111',
  } = overwrites;

  return {
    email,
    firstname,
    secondname,
    bio,
    avatar,
    createdAt,
    passwordHash: bcrypt.hashSync(passwordHash, 5),
  };
};

export const createRecipe = (
  author: Author,
  category: Category,
  overwrites: Partial<Omit<RecipeUncheckedCreateInput, 'id' | 'authorId' | 'createdAt'>> = {}
): RecipeUncheckedCreateInput => {
  const {
    title = faker.lorem.words({ min: 1, max: 4 }),
    description = faker.lorem.paragraph({ min: 1, max: 5 }),
    previewImage = faker.image.dataUri(),
    content = faker.lorem.paragraphs({ min: 1, max: 20 }),
    cookingTime = faker.helpers.rangeToNumber({ min: 5, max: 360 }),
    difficulty = faker.helpers.enumValue(Difficulty),
  } = overwrites;

  const createdAt = faker.date.future({ years: 2, refDate: author.createdAt });

  return {
    title,
    description,
    previewImage,
    categoryId: category.id,
    content,
    cookingTime,
    difficulty,
    createdAt,
    authorId: author.id,
  };
};

export const createTag = (name?: string): TagCreateInput => ({ name: name || faker.word.adverb() });

export const createRecipeTag = (recipes: Recipe[], tags: Tag[]) => ({
  recipeId: faker.helpers.arrayElement(recipes.map((r) => r.id)),
  tagId: faker.helpers.arrayElement(tags.map((t) => t.id)),
});

export const createIngredient = (name?: string): IngredientCreateInput => ({
  name: name || faker.food.ingredient(),
});

export const createRecipeIngredient = (
  recipeId: string,
  ingredientId: string,
  overwrites: Partial<Omit<RecipeIngredientUncheckedCreateInput, 'recipeId' | 'ingredientId'>> = {}
): RecipeIngredientUncheckedCreateInput => {
  const { amount = faker.number.int({ min: 1, max: 1000 }), unit = faker.lorem.word() } =
    overwrites;

  return {
    recipeId,
    ingredientId,
    amount,
    unit,
  };
};
