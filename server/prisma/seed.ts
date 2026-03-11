import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { Difficulty, PrismaClient, Recipe, Tag } from '../src/generated/prisma/client';
import { Author } from '../src/generated/prisma/browser';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import {
  AuthorCreateInput,
  IngredientCreateInput,
  RecipeIngredientUncheckedCreateInput,
  RecipeUncheckedCreateInput,
  TagCreateInput,
} from '../src/generated/prisma/models';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

faker.seed(1);

const createAuthor = (overwrites: Partial<Author> = {}): AuthorCreateInput => {
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

const createRecipe = (
  author: Author,
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
    content,
    cookingTime,
    difficulty,
    createdAt,
    authorId: author.id,
  };
};

const createTag = (name?: string): TagCreateInput => ({ name: name || faker.word.adverb() });

const createRecipeTag = (recipes: Recipe[], tags: Tag[]) => ({
  recipeId: faker.helpers.arrayElement(recipes.map((r) => r.id)),
  tagId: faker.helpers.arrayElement(tags.map((t) => t.id)),
});

const createIngredient = (name?: string): IngredientCreateInput => ({
  name: name || faker.food.ingredient(),
});

const createRecipeIngredient = (
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

async function main() {
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE authors, tags, ingredients, recipes, recipe_ingredients RESTART IDENTITY CASCADE'
  );

  const authors = await prisma.author.createManyAndReturn({
    data: [
      createAuthor({ passwordHash: '11111111' }),
      createAuthor({ passwordHash: '22222222' }),
      createAuthor({ passwordHash: '33333333' }),
      ...Array.from({ length: 7 }).map(() => createAuthor()),
    ],
  });

  const tags = await prisma.tag.createManyAndReturn({
    data: [...Array.from({ length: 10 }).map(() => createTag())],
    skipDuplicates: true,
  });

  const ingredients = await prisma.ingredient.createManyAndReturn({
    data: [...Array.from({ length: 15 }).map(() => createIngredient())],
    skipDuplicates: true,
  });

  const recipes = await prisma.recipe.createManyAndReturn({
    data: [
      ...Array.from({ length: 50 }).map(() => createRecipe(faker.helpers.arrayElement(authors))),
    ],
  });

  const recipeTags = await prisma.recipeTag.createMany({
    data: [...Array.from({ length: 100 }).map(() => createRecipeTag(recipes, tags))],
    skipDuplicates: true,
  });

  const recipeIngredients = await prisma.recipeIngredient.createManyAndReturn({
    data: [
      ...Array.from({ length: 200 }).map(() =>
        createRecipeIngredient(
          faker.helpers.arrayElement(recipes.map((r) => r.id)),
          faker.helpers.arrayElement(ingredients.map((i) => i.id))
        )
      ),
    ],
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
