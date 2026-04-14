import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { Difficulty, PrismaClient } from '../src/generated/prisma/client';
import { faker } from '@faker-js/faker';
import { categories } from './data/categories';
import { tags } from './data/tags';
import { ingredients } from './data/ingredients';
import { recipeIngredients, recipes, recipeTags } from './data/recipes';
import { authors } from './data/authors';
import { comments } from './data/comments';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

faker.seed(1);

async function main() {
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE authors, tags, ingredients, categories, recipes, recipe_tags, recipe_ingredients RESTART IDENTITY CASCADE'
  );

  await prisma.author.createMany({
    data: authors,
  });
  await prisma.category.createMany({
    data: categories,
  });
  await prisma.tag.createMany({
    data: tags,
  });
  await prisma.ingredient.createMany({
    data: ingredients,
  });
  await prisma.recipe.createMany({
    data: recipes.map((r) => ({ ...r, difficulty: r.difficulty as Difficulty })),
  });
  await prisma.recipeTag.createMany({
    data: recipeTags,
  });
  await prisma.recipeIngredient.createMany({
    data: recipeIngredients,
  });
  await prisma.comment.createMany({
    data: comments,
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
