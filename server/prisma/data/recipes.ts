import { faker } from '@faker-js/faker';
import { authors } from './authors';
import { categories } from './categories';
import { v4 as uuidv4 } from 'uuid';
import { tags } from './tags';
import { ingredients } from './ingredients';
import {
  Difficulty,
  Rating,
  Recipe,
  RecipeStep,
  RecipeTag,
  RecipeVersion,
} from 'src/generated/prisma/client';

const authorsIds = authors.map((a) => a.id);

export const recipes: Recipe[] = Array.from({ length: 40 }).map(() => ({
  id: uuidv4(),
  authorId: faker.helpers.arrayElement(authorsIds),
  viewsCount: faker.number.int({ min: 50, max: 150 }),
  createdAt: faker.date.recent({ days: 120 }),
  ratingsCount: 0,
  ratingsSum: 0,
  ratingsAvg: 0,
  currentVersionId: null,
}));

export const recipeVersions: RecipeVersion[] = [
  {
    title: 'Classic Borscht',
    categoryId: categories[0].id,
    description: 'Traditional Ukrainian beet soup with beef',
    previewImage: 'https://example.com/images/borscht.jpg',
    cookingTime: 60,
    difficulty: 'medium',
  },
  {
    title: 'Caesar Salad',
    categoryId: categories[2].id,
    description: 'Fresh salad with chicken and croutons',
    previewImage: 'https://example.com/images/caesar.jpg',
    cookingTime: 20,
    difficulty: 'easy',
  },
  {
    title: 'Spaghetti Carbonara',
    categoryId: categories[12].id,
    description: 'Italian pasta with bacon and creamy sauce',
    previewImage: 'https://example.com/images/carbonara.jpg',
    cookingTime: 30,
    difficulty: 'medium',
  },
  {
    title: 'Chocolate Cake',
    categoryId: categories[3].id,
    description: 'Rich chocolate dessert',
    previewImage: 'https://example.com/images/chocolate_cake.jpg',
    cookingTime: 50,
    difficulty: 'hard',
  },
  {
    title: 'Lemonade',
    categoryId: categories[4].id,
    description: 'Refreshing drink with lemon and mint',
    previewImage: 'https://example.com/images/lemonade.jpg',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Grilled Chicken Breast',
    categoryId: categories[11].id,
    description: 'Juicy grilled chicken with spices',
    previewImage: 'https://example.com/images/grilled_chicken.jpg',
    cookingTime: 30,
    difficulty: 'easy',
  },
  {
    title: 'Beef Stir Fry',
    categoryId: categories[12].id,
    description: 'Asian style beef stir fry',
    previewImage: 'https://example.com/images/beef_stirfry.jpg',
    cookingTime: 25,
    difficulty: 'medium',
  },
  {
    title: 'Pancakes',
    categoryId: categories[5].id,
    description: 'Fluffy breakfast pancakes',
    previewImage: 'https://example.com/images/pancakes.jpg',
    cookingTime: 20,
    difficulty: 'easy',
  },
  {
    title: 'Chocolate Muffins',
    categoryId: categories[7].id,
    description: 'Soft chocolate muffins',
    previewImage: 'https://example.com/images/muffins.jpg',
    cookingTime: 35,
    difficulty: 'medium',
  },
  {
    title: 'Greek Salad',
    categoryId: categories[2].id,
    description: 'Fresh vegetable salad',
    previewImage: 'https://example.com/images/greek.jpg',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Tomato Soup',
    categoryId: categories[0].id,
    description: 'Warm and creamy tomato soup',
    previewImage: 'https://example.com/tomato_soup.jpg',
    cookingTime: 35,
    difficulty: 'easy',
  },
  {
    title: 'Fried Rice',
    categoryId: categories[1].id,
    description: 'Classic Asian fried rice',
    previewImage: 'https://example.com/fried_rice.jpg',
    cookingTime: 25,
    difficulty: 'easy',
  },
  {
    title: 'Omelette',
    categoryId: categories[5].id,
    description: 'Simple egg omelette',
    previewImage: 'https://example.com/omelette.jpg',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Banana Smoothie',
    categoryId: categories[4].id,
    description: 'Healthy banana drink',
    previewImage: 'https://example.com/smoothie.jpg',
    cookingTime: 5,
    difficulty: 'easy',
  },
  {
    title: 'Shrimp Pasta',
    categoryId: categories[12].id,
    description: 'Pasta with shrimp and garlic',
    previewImage: 'https://example.com/shrimp_pasta.jpg',
    cookingTime: 30,
    difficulty: 'medium',
  },
  {
    title: 'Vegetable Stir Fry',
    categoryId: categories[10].id,
    description: 'Mixed vegetables stir fry',
    previewImage: 'https://example.com/veg_stirfry.jpg',
    cookingTime: 20,
    difficulty: 'easy',
  },
  {
    title: 'Apple Pie',
    categoryId: categories[3].id,
    description: 'Classic apple pie dessert',
    previewImage: 'https://example.com/apple_pie.jpg',
    cookingTime: 60,
    difficulty: 'hard',
  },
  {
    title: 'Garlic Bread',
    categoryId: categories[6].id,
    description: 'Crispy garlic bread',
    previewImage: 'https://example.com/garlic_bread.jpg',
    cookingTime: 15,
    difficulty: 'easy',
  },
  {
    title: 'Grilled Salmon',
    categoryId: categories[8].id,
    description: 'Fresh grilled salmon fillet',
    previewImage: 'https://example.com/salmon.jpg',
    cookingTime: 25,
    difficulty: 'medium',
  },
  {
    title: 'Chocolate Milkshake',
    categoryId: categories[4].id,
    description: 'Sweet chocolate drink',
    previewImage: 'https://example.com/milkshake.jpg',
    cookingTime: 5,
    difficulty: 'easy',
  },
  {
    title: 'Chicken Curry',
    categoryId: categories[1].id,
    description: 'Spicy chicken curry with rich sauce',
    previewImage: 'https://example.com/chicken_curry.jpg',
    cookingTime: 40,
    difficulty: 'medium',
  },
  {
    title: 'Beef Burger',
    categoryId: categories[6].id,
    description: 'Juicy homemade beef burger',
    previewImage: 'https://example.com/burger.jpg',
    cookingTime: 25,
    difficulty: 'easy',
  },
  {
    title: 'Beef Burger',
    categoryId: categories[6].id,
    description: 'Juicy homemade beef burger',
    previewImage: 'https://example.com/burger.jpg',
    cookingTime: 25,
    difficulty: 'easy',
  },
  {
    title: 'Spaghetti Bolognese',
    categoryId: categories[12].id,
    description: 'Classic Italian pasta with meat sauce',
    previewImage: 'https://example.com/bolognese.jpg',
    cookingTime: 45,
    difficulty: 'medium',
  },
  {
    title: 'French Toast',
    categoryId: categories[5].id,
    description: 'Sweet breakfast toast',
    previewImage: 'https://example.com/french_toast.jpg',
    cookingTime: 15,
    difficulty: 'easy',
  },
  {
    title: 'Tuna Salad',
    categoryId: categories[2].id,
    description: 'Protein-rich tuna salad',
    previewImage: 'https://example.com/tuna_salad.jpg',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Mushroom Risotto',
    categoryId: categories[12].id,
    description: 'Creamy risotto with mushrooms',
    previewImage: 'https://example.com/risotto.jpg',
    cookingTime: 40,
    difficulty: 'hard',
  },
  {
    title: 'Chicken Nuggets',
    categoryId: categories[6].id,
    description: 'Crispy fried chicken nuggets',
    previewImage: 'https://example.com/nuggets.jpg',
    cookingTime: 20,
    difficulty: 'easy',
  },
  {
    title: 'Berry Smoothie',
    categoryId: categories[4].id,
    description: 'Fresh berry smoothie',
    previewImage: 'https://example.com/berry_smoothie.jpg',
    cookingTime: 5,
    difficulty: 'easy',
  },
  {
    title: 'Roasted Potatoes',
    categoryId: categories[1].id,
    description: 'Crispy roasted potatoes',
    previewImage: 'https://example.com/potatoes.jpg',
    cookingTime: 35,
    difficulty: 'easy',
  },
  {
    title: 'Garlic Shrimp',
    categoryId: categories[8].id,
    description: 'Shrimp sautéed in garlic butter',
    previewImage: 'https://example.com/shrimp.jpg',
    cookingTime: 15,
    difficulty: 'easy',
  },
  {
    title: 'Pork Chops',
    categoryId: categories[1].id,
    description: 'Pan-fried pork chops',
    previewImage: 'https://example.com/pork.jpg',
    cookingTime: 30,
    difficulty: 'medium',
  },
  {
    title: 'Veggie Wrap',
    categoryId: categories[6].id,
    description: 'Healthy vegetable wrap',
    previewImage: 'https://example.com/wrap.jpg',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Chicken Alfredo',
    categoryId: categories[12].id,
    description: 'Creamy chicken pasta',
    previewImage: 'https://example.com/alfredo.jpg',
    cookingTime: 35,
    difficulty: 'medium',
  },
  {
    title: 'Egg Salad',
    categoryId: categories[2].id,
    description: 'Simple egg salad',
    previewImage: 'https://example.com/egg_salad.jpg',
    cookingTime: 15,
    difficulty: 'easy',
  },
  {
    title: 'Lentil Soup',
    categoryId: categories[0].id,
    description: 'Healthy lentil soup',
    previewImage: 'https://example.com/lentil.jpg',
    cookingTime: 40,
    difficulty: 'easy',
  },
  {
    title: 'BBQ Ribs',
    categoryId: categories[11].id,
    description: 'Slow cooked BBQ ribs',
    previewImage: 'https://example.com/ribs.jpg',
    cookingTime: 90,
    difficulty: 'hard',
  },
  {
    title: 'Avocado Toast',
    categoryId: categories[5].id,
    description: 'Simple avocado toast',
    previewImage: 'https://example.com/avocado.jpg',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Avocado Toast',
    categoryId: categories[5].id,
    description: 'Simple avocado toast',
    previewImage: 'https://example.com/avocado.jpg',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Chocolate Brownie',
    categoryId: categories[9].id,
    description: 'Rich and fudgy chocolate brownie',
    previewImage: 'https://example.com/brownie.jpg',
    cookingTime: 30,
    difficulty: 'easy',
  },
].map((v, i) => ({
  ...v,
  previewImage: `${i}.jpg`,
  difficulty: v.difficulty as Difficulty,

  id: uuidv4(),
  recipeId: recipes[i].id,
  version: 1,
  createdAt: recipes[i].createdAt,
  changeDescription: faker.lorem.sentence({ min: 1, max: 5 }),
}));

export const recipeSteps: RecipeStep[] = Array.from({ length: 200 }).map(() => ({
  id: uuidv4(),
  recipeVersionId: faker.helpers.arrayElement(recipeVersions.map((r) => r.id)),
  content: faker.lorem.sentences(),
}));

export const recipeTags: RecipeTag[] = [
  { recipeVersionId: recipeVersions[0].id, tagId: tags[1].id }, // Classic Borscht - Healthy
  { recipeVersionId: recipeVersions[0].id, tagId: tags[6].id }, // Classic Borscht - Spicy
  { recipeVersionId: recipeVersions[1].id, tagId: tags[0].id }, // Caesar Salad - Quick
  { recipeVersionId: recipeVersions[1].id, tagId: tags[7].id }, // Caesar Salad - Vegetarian
  { recipeVersionId: recipeVersions[2].id, tagId: tags[0].id }, // Spaghetti Carbonara - Quick
  { recipeVersionId: recipeVersions[2].id, tagId: tags[15].id }, // Spaghetti Carbonara - Intermediate
  { recipeVersionId: recipeVersions[3].id, tagId: tags[5].id }, // Chocolate Cake - Comfort Food
  { recipeVersionId: recipeVersions[3].id, tagId: tags[16].id }, // Chocolate Cake - Advanced
  { recipeVersionId: recipeVersions[4].id, tagId: tags[9].id }, // Lemonade - Breakfast
  { recipeVersionId: recipeVersions[4].id, tagId: tags[0].id }, // Lemonade - Quick
  { recipeVersionId: recipeVersions[5].id, tagId: tags[0].id }, // Grilled Chicken Breast - Quick
  { recipeVersionId: recipeVersions[5].id, tagId: tags[10].id }, // Grilled Chicken Breast - Dinner
  { recipeVersionId: recipeVersions[6].id, tagId: tags[6].id }, // Beef Stir Fry - Spicy
  { recipeVersionId: recipeVersions[6].id, tagId: tags[15].id }, // Beef Stir Fry - Intermediate
  { recipeVersionId: recipeVersions[7].id, tagId: tags[9].id }, // Pancakes - Breakfast
  { recipeVersionId: recipeVersions[7].id, tagId: tags[0].id }, // Pancakes - Quick
  { recipeVersionId: recipeVersions[8].id, tagId: tags[5].id }, // Chocolate Muffins - Comfort Food
  { recipeVersionId: recipeVersions[8].id, tagId: tags[16].id }, // Chocolate Muffins - Advanced
  { recipeVersionId: recipeVersions[9].id, tagId: tags[7].id }, // Greek Salad - Vegetarian
  { recipeVersionId: recipeVersions[9].id, tagId: tags[0].id }, // Greek Salad - Quick
  { recipeVersionId: recipeVersions[10].id, tagId: tags[0].id }, // Tomato Soup - Quick
  { recipeVersionId: recipeVersions[10].id, tagId: tags[1].id }, // Tomato Soup - Healthy
  { recipeVersionId: recipeVersions[11].id, tagId: tags[0].id }, // Fried Rice - Quick
  { recipeVersionId: recipeVersions[11].id, tagId: tags[6].id }, // Fried Rice - Spicy
  { recipeVersionId: recipeVersions[12].id, tagId: tags[0].id }, // Omelette - Quick
  { recipeVersionId: recipeVersions[12].id, tagId: tags[9].id }, // Omelette - Breakfast
  { recipeVersionId: recipeVersions[13].id, tagId: tags[1].id }, // Banana Smoothie - Healthy
  { recipeVersionId: recipeVersions[13].id, tagId: tags[0].id }, // Banana Smoothie - Quick
  { recipeVersionId: recipeVersions[14].id, tagId: tags[6].id }, // Shrimp Pasta - Spicy
  { recipeVersionId: recipeVersions[14].id, tagId: tags[15].id }, // Shrimp Pasta - Intermediate
  { recipeVersionId: recipeVersions[15].id, tagId: tags[7].id }, // Vegetable Stir Fry - Vegetarian
  { recipeVersionId: recipeVersions[15].id, tagId: tags[0].id }, // Vegetable Stir Fry - Quick
  { recipeVersionId: recipeVersions[16].id, tagId: tags[5].id }, // Apple Pie - Comfort Food
  { recipeVersionId: recipeVersions[16].id, tagId: tags[16].id }, // Apple Pie - Advanced
  { recipeVersionId: recipeVersions[17].id, tagId: tags[0].id }, // Garlic Bread - Quick
  { recipeVersionId: recipeVersions[17].id, tagId: tags[10].id }, // Garlic Bread - Dinner
  { recipeVersionId: recipeVersions[18].id, tagId: tags[15].id }, // Grilled Salmon - Intermediate
  { recipeVersionId: recipeVersions[18].id, tagId: tags[10].id }, // Grilled Salmon - Dinner
  { recipeVersionId: recipeVersions[19].id, tagId: tags[0].id }, // Chocolate Milkshake - Quick
  { recipeVersionId: recipeVersions[19].id, tagId: tags[5].id }, // Chocolate Milkshake - Comfort Food
  { recipeVersionId: recipeVersions[20].id, tagId: tags[6].id }, // Chicken Curry - Spicy
  { recipeVersionId: recipeVersions[20].id, tagId: tags[15].id }, // Chicken Curry - Intermediate
  { recipeVersionId: recipeVersions[21].id, tagId: tags[0].id }, // Beef Burger - Quick
  { recipeVersionId: recipeVersions[21].id, tagId: tags[18].id }, // Beef Burger - Kid-Approved
  { recipeVersionId: recipeVersions[22].id, tagId: tags[0].id }, // Spaghetti Bolognese - Quick
  { recipeVersionId: recipeVersions[22].id, tagId: tags[15].id }, // Spaghetti Bolognese - Intermediate
  { recipeVersionId: recipeVersions[23].id, tagId: tags[9].id }, // French Toast - Breakfast
  { recipeVersionId: recipeVersions[23].id, tagId: tags[0].id }, // French Toast - Quick
  { recipeVersionId: recipeVersions[24].id, tagId: tags[1].id }, // Tuna Salad - Healthy
  { recipeVersionId: recipeVersions[24].id, tagId: tags[0].id }, // Tuna Salad - Quick
  { recipeVersionId: recipeVersions[25].id, tagId: tags[16].id }, // Mushroom Risotto - Advanced
  { recipeVersionId: recipeVersions[25].id, tagId: tags[15].id }, // Mushroom Risotto - Intermediate
  { recipeVersionId: recipeVersions[26].id, tagId: tags[0].id }, // Chicken Nuggets - Quick
  { recipeVersionId: recipeVersions[26].id, tagId: tags[18].id }, // Chicken Nuggets - Kid-Approved
  { recipeVersionId: recipeVersions[27].id, tagId: tags[1].id }, // Berry Smoothie - Healthy
  { recipeVersionId: recipeVersions[27].id, tagId: tags[0].id }, // Berry Smoothie - Quick
  { recipeVersionId: recipeVersions[28].id, tagId: tags[0].id }, // Roasted Potatoes - Quick
  { recipeVersionId: recipeVersions[28].id, tagId: tags[5].id }, // Roasted Potatoes - Comfort Food
  { recipeVersionId: recipeVersions[29].id, tagId: tags[6].id }, // Garlic Shrimp - Spicy
  { recipeVersionId: recipeVersions[29].id, tagId: tags[15].id }, // Garlic Shrimp - Intermediate
  { recipeVersionId: recipeVersions[30].id, tagId: tags[15].id }, // Pork Chops - Intermediate
  { recipeVersionId: recipeVersions[30].id, tagId: tags[10].id }, // Pork Chops - Dinner
  { recipeVersionId: recipeVersions[31].id, tagId: tags[7].id }, // Veggie Wrap - Vegetarian
  { recipeVersionId: recipeVersions[31].id, tagId: tags[0].id }, // Veggie Wrap - Quick
  { recipeVersionId: recipeVersions[32].id, tagId: tags[15].id }, // Chicken Alfredo - Intermediate
  { recipeVersionId: recipeVersions[32].id, tagId: tags[10].id }, // Chicken Alfredo - Dinner
  { recipeVersionId: recipeVersions[33].id, tagId: tags[0].id }, // Egg Salad - Quick
  { recipeVersionId: recipeVersions[33].id, tagId: tags[1].id }, // Egg Salad - Healthy
  { recipeVersionId: recipeVersions[34].id, tagId: tags[1].id }, // Lentil Soup - Healthy
  { recipeVersionId: recipeVersions[34].id, tagId: tags[0].id }, // Lentil Soup - Quick
  { recipeVersionId: recipeVersions[35].id, tagId: tags[16].id }, // BBQ Ribs - Advanced
  { recipeVersionId: recipeVersions[35].id, tagId: tags[5].id }, // BBQ Ribs - Comfort Food
  { recipeVersionId: recipeVersions[36].id, tagId: tags[0].id }, // Avocado Toast - Quick
  { recipeVersionId: recipeVersions[36].id, tagId: tags[7].id }, // Avocado Toast - Vegetarian
  { recipeVersionId: recipeVersions[37].id, tagId: tags[0].id }, // Avocado Toast - Quick
  { recipeVersionId: recipeVersions[37].id, tagId: tags[7].id }, // Avocado Toast - Vegetarian
  { recipeVersionId: recipeVersions[38].id, tagId: tags[5].id }, // Chocolate Brownie - Comfort Food
  { recipeVersionId: recipeVersions[38].id, tagId: tags[16].id }, // Chocolate Brownie - Advanced
];

export const recipeIngredients = [
  // Classic Borscht
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[0].id,
    ingredientId: ingredients[1].id,
    amount: 300,
    unit: 'g',
  }, // Ground Beef
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[0].id,
    ingredientId: ingredients[19].id,
    amount: 2,
    unit: 'pcs',
  }, // Carrot
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[0].id,
    ingredientId: ingredients[20].id,
    amount: 3,
    unit: 'pcs',
  }, // Potato
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[0].id,
    ingredientId: ingredients[21].id,
    amount: 2,
    unit: 'pcs',
  }, // Tomato
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[0].id,
    ingredientId: ingredients[17].id,
    amount: 3,
    unit: 'cloves',
  }, // Garlic

  // Caesar Salad
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[1].id,
    ingredientId: ingredients[0].id,
    amount: 200,
    unit: 'g',
  }, // Chicken Breast
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[1].id,
    ingredientId: ingredients[21].id,
    amount: 1,
    unit: 'pcs',
  }, // Lettuce
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[1].id,
    ingredientId: ingredients[22].id,
    amount: 1,
    unit: 'pcs',
  }, // Cucumber
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[1].id,
    ingredientId: ingredients[8].id,
    amount: 50,
    unit: 'g',
  }, // Cheddar Cheese
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[1].id,
    ingredientId: ingredients[27].id,
    amount: 2,
    unit: 'tbsp',
  }, // Olive Oil

  // Spaghetti Carbonara
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[2].id,
    ingredientId: ingredients[41].id,
    amount: 200,
    unit: 'g',
  }, // Pasta
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[2].id,
    ingredientId: ingredients[5].id,
    amount: 2,
    unit: 'pcs',
  }, // Eggs
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[2].id,
    ingredientId: ingredients[9].id,
    amount: 50,
    unit: 'g',
  }, // Parmesan Cheese
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[2].id,
    ingredientId: ingredients[17].id,
    amount: 2,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[2].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Chocolate Cake
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[3].id,
    ingredientId: ingredients[12].id,
    amount: 200,
    unit: 'g',
  }, // Flour
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[3].id,
    ingredientId: ingredients[13].id,
    amount: 150,
    unit: 'g',
  }, // Sugar
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[3].id,
    ingredientId: ingredients[7].id,
    amount: 100,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[3].id,
    ingredientId: ingredients[42].id,
    amount: 100,
    unit: 'g',
  }, // Chocolate
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[3].id,
    ingredientId: ingredients[5].id,
    amount: 3,
    unit: 'pcs',
  }, // Eggs

  // Lemonade
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[4].id,
    ingredientId: ingredients[35].id,
    amount: 2,
    unit: 'pcs',
  }, // Lemon
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[4].id,
    ingredientId: ingredients[34].id,
    amount: 3,
    unit: 'tbsp',
  }, // Honey
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[4].id,
    ingredientId: ingredients[33].id,
    amount: 500,
    unit: 'ml',
  }, // Water
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[4].id,
    ingredientId: ingredients[36].id,
    amount: 5,
    unit: 'leaves',
  }, // Basil (mint substitute)

  // Grilled Chicken Breast
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[5].id,
    ingredientId: ingredients[0].id,
    amount: 1,
    unit: 'pcs',
  }, // Chicken Breast
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[5].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[5].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[5].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Beef Stir Fry
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[6].id,
    ingredientId: ingredients[1].id,
    amount: 200,
    unit: 'g',
  }, // Ground Beef
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[6].id,
    ingredientId: ingredients[23].id,
    amount: 1,
    unit: 'pcs',
  }, // Bell Pepper
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[6].id,
    ingredientId: ingredients[18].id,
    amount: 1,
    unit: 'pcs',
  }, // Onion
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[6].id,
    ingredientId: ingredients[30].id,
    amount: 2,
    unit: 'tbsp',
  }, // Soy Sauce
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[6].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Pancakes
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[7].id,
    ingredientId: ingredients[12].id,
    amount: 100,
    unit: 'g',
  }, // Flour
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[7].id,
    ingredientId: ingredients[13].id,
    amount: 50,
    unit: 'g',
  }, // Sugar
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[7].id,
    ingredientId: ingredients[5].id,
    amount: 1,
    unit: 'pcs',
  }, // Egg
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[7].id,
    ingredientId: ingredients[7].id,
    amount: 20,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[7].id,
    ingredientId: ingredients[6].id,
    amount: 100,
    unit: 'ml',
  }, // Milk

  // Chocolate Muffins
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[8].id,
    ingredientId: ingredients[12].id,
    amount: 150,
    unit: 'g',
  }, // Flour
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[8].id,
    ingredientId: ingredients[13].id,
    amount: 100,
    unit: 'g',
  }, // Sugar
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[8].id,
    ingredientId: ingredients[42].id,
    amount: 50,
    unit: 'g',
  }, // Chocolate
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[8].id,
    ingredientId: ingredients[5].id,
    amount: 1,
    unit: 'pcs',
  }, // Egg
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[8].id,
    ingredientId: ingredients[7].id,
    amount: 30,
    unit: 'g',
  }, // Butter

  // Greek Salad
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[9].id,
    ingredientId: ingredients[21].id,
    amount: 1,
    unit: 'pcs',
  }, // Lettuce
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[9].id,
    ingredientId: ingredients[22].id,
    amount: 1,
    unit: 'pcs',
  }, // Cucumber
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[9].id,
    ingredientId: ingredients[23].id,
    amount: 1,
    unit: 'pcs',
  }, // Bell Pepper
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[9].id,
    ingredientId: ingredients[8].id,
    amount: 50,
    unit: 'g',
  }, // Cheddar Cheese
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[9].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Tomato Soup
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[10].id,
    ingredientId: ingredients[21].id,
    amount: 4,
    unit: 'pcs',
  }, // Tomato
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[10].id,
    ingredientId: ingredients[19].id,
    amount: 2,
    unit: 'pcs',
  }, // Carrot
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[10].id,
    ingredientId: ingredients[20].id,
    amount: 3,
    unit: 'pcs',
  }, // Potato
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[10].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[10].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Fried Rice
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[11].id,
    ingredientId: ingredients[40].id,
    amount: 200,
    unit: 'g',
  }, // Rice
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[11].id,
    ingredientId: ingredients[18].id,
    amount: 1,
    unit: 'pcs',
  }, // Onion
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[11].id,
    ingredientId: ingredients[23].id,
    amount: 1,
    unit: 'pcs',
  }, // Bell Pepper
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[11].id,
    ingredientId: ingredients[30].id,
    amount: 2,
    unit: 'tbsp',
  }, // Soy Sauce
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[11].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Omelette
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[12].id,
    ingredientId: ingredients[5].id,
    amount: 3,
    unit: 'pcs',
  }, // Eggs
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[12].id,
    ingredientId: ingredients[6].id,
    amount: 50,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[12].id,
    ingredientId: ingredients[7].id,
    amount: 20,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[12].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Banana Smoothie
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[13].id,
    ingredientId: ingredients[44].id,
    amount: 2,
    unit: 'pcs',
  }, // Banana
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[13].id,
    ingredientId: ingredients[6].id,
    amount: 200,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[13].id,
    ingredientId: ingredients[49].id,
    amount: 100,
    unit: 'g',
  }, // Yogurt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[13].id,
    ingredientId: ingredients[34].id,
    amount: 1,
    unit: 'tbsp',
  }, // Honey

  // Shrimp Pasta
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[14].id,
    ingredientId: ingredients[41].id,
    amount: 200,
    unit: 'g',
  }, // Pasta
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[14].id,
    ingredientId: ingredients[4].id,
    amount: 150,
    unit: 'g',
  }, // Shrimp
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[14].id,
    ingredientId: ingredients[17].id,
    amount: 2,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[14].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Vegetable Stir Fry
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[15].id,
    ingredientId: ingredients[19].id,
    amount: 1,
    unit: 'pcs',
  }, // Carrot
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[15].id,
    ingredientId: ingredients[22].id,
    amount: 1,
    unit: 'pcs',
  }, // Cucumber
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[15].id,
    ingredientId: ingredients[23].id,
    amount: 1,
    unit: 'pcs',
  }, // Bell Pepper
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[15].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[15].id,
    ingredientId: ingredients[30].id,
    amount: 1,
    unit: 'tbsp',
  }, // Soy Sauce

  // Apple Pie
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[16].id,
    ingredientId: ingredients[12].id,
    amount: 250,
    unit: 'g',
  }, // Flour
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[16].id,
    ingredientId: ingredients[13].id,
    amount: 150,
    unit: 'g',
  }, // Sugar
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[16].id,
    ingredientId: ingredients[7].id,
    amount: 100,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[16].id,
    ingredientId: ingredients[44].id,
    amount: 3,
    unit: 'pcs',
  }, // Apple
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[16].id,
    ingredientId: ingredients[5].id,
    amount: 2,
    unit: 'pcs',
  }, // Eggs

  // Garlic Bread
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[17].id,
    ingredientId: ingredients[43].id,
    amount: 1,
    unit: 'loaf',
  }, // Bread
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[17].id,
    ingredientId: ingredients[17].id,
    amount: 3,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[17].id,
    ingredientId: ingredients[7].id,
    amount: 50,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[17].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Grilled Salmon
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[18].id,
    ingredientId: ingredients[3].id,
    amount: 1,
    unit: 'pcs',
  }, // Salmon
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[18].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[18].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[18].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Chocolate Milkshake
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[19].id,
    ingredientId: ingredients[6].id,
    amount: 200,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[19].id,
    ingredientId: ingredients[42].id,
    amount: 50,
    unit: 'g',
  }, // Chocolate
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[19].id,
    ingredientId: ingredients[49].id,
    amount: 50,
    unit: 'g',
  }, // Yogurt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[19].id,
    ingredientId: ingredients[34].id,
    amount: 1,
    unit: 'tbsp',
  }, // Honey

  // Chicken Curry
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[20].id,
    ingredientId: ingredients[0].id,
    amount: 300,
    unit: 'g',
  }, // Chicken Breast
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[20].id,
    ingredientId: ingredients[17].id,
    amount: 3,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[20].id,
    ingredientId: ingredients[18].id,
    amount: 1,
    unit: 'pcs',
  }, // Onion
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[20].id,
    ingredientId: ingredients[27].id,
    amount: 2,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[20].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Beef Burger (1)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[21].id,
    ingredientId: ingredients[1].id,
    amount: 200,
    unit: 'g',
  }, // Ground Beef
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[21].id,
    ingredientId: ingredients[43].id,
    amount: 1,
    unit: 'pcs',
  }, // Bread
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[21].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[21].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[21].id,
    ingredientId: ingredients[7].id,
    amount: 10,
    unit: 'g',
  }, // Butter

  // Beef Burger (2)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[22].id,
    ingredientId: ingredients[1].id,
    amount: 200,
    unit: 'g',
  }, // Ground Beef
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[22].id,
    ingredientId: ingredients[43].id,
    amount: 1,
    unit: 'pcs',
  }, // Bread
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[22].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[22].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[22].id,
    ingredientId: ingredients[7].id,
    amount: 10,
    unit: 'g',
  }, // Butter

  // Spaghetti Bolognese
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[23].id,
    ingredientId: ingredients[41].id,
    amount: 200,
    unit: 'g',
  }, // Pasta
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[23].id,
    ingredientId: ingredients[1].id,
    amount: 150,
    unit: 'g',
  }, // Ground Beef
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[23].id,
    ingredientId: ingredients[17].id,
    amount: 2,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[23].id,
    ingredientId: ingredients[18].id,
    amount: 1,
    unit: 'pcs',
  }, // Onion
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[23].id,
    ingredientId: ingredients[30].id,
    amount: 2,
    unit: 'tbsp',
  }, // Soy Sauce

  // French Toast
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[24].id,
    ingredientId: ingredients[43].id,
    amount: 2,
    unit: 'slices',
  }, // Bread
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[24].id,
    ingredientId: ingredients[5].id,
    amount: 2,
    unit: 'pcs',
  }, // Eggs
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[24].id,
    ingredientId: ingredients[6].id,
    amount: 50,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[24].id,
    ingredientId: ingredients[7].id,
    amount: 10,
    unit: 'g',
  }, // Butter

  // Tuna Salad
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[25].id,
    ingredientId: ingredients[43].id,
    amount: 50,
    unit: 'g',
  }, // Bread (as croutons)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[25].id,
    ingredientId: ingredients[22].id,
    amount: 1,
    unit: 'pcs',
  }, // Cucumber
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[25].id,
    ingredientId: ingredients[21].id,
    amount: 2,
    unit: 'pcs',
  }, // Tomato
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[25].id,
    ingredientId: ingredients[1].id,
    amount: 100,
    unit: 'g',
  }, // Ground Beef (optional protein substitute)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[25].id,
    ingredientId: ingredients[34].id,
    amount: 1,
    unit: 'tbsp',
  }, // Honey (dressing touch)

  // Mushroom Risotto
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[26].id,
    ingredientId: ingredients[41].id,
    amount: 200,
    unit: 'g',
  }, // Rice
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[26].id,
    ingredientId: ingredients[26].id,
    amount: 150,
    unit: 'g',
  }, // Mushrooms
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[26].id,
    ingredientId: ingredients[12].id,
    amount: 50,
    unit: 'g',
  }, // Flour (optional thickener)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[26].id,
    ingredientId: ingredients[11].id,
    amount: 100,
    unit: 'ml',
  }, // Cream
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[26].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Chicken Nuggets
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[27].id,
    ingredientId: ingredients[0].id,
    amount: 250,
    unit: 'g',
  }, // Chicken Breast
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[27].id,
    ingredientId: ingredients[12].id,
    amount: 100,
    unit: 'g',
  }, // Flour
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[27].id,
    ingredientId: ingredients[7].id,
    amount: 50,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[27].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[27].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper

  // Berry Smoothie
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[28].id,
    ingredientId: ingredients[46].id,
    amount: 50,
    unit: 'g',
  }, // Blueberries
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[28].id,
    ingredientId: ingredients[44].id,
    amount: 1,
    unit: 'pcs',
  }, // Banana
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[28].id,
    ingredientId: ingredients[6].id,
    amount: 200,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[28].id,
    ingredientId: ingredients[49].id,
    amount: 50,
    unit: 'g',
  }, // Yogurt

  // Roasted Potatoes
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[29].id,
    ingredientId: ingredients[20].id,
    amount: 4,
    unit: 'pcs',
  }, // Potato
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[29].id,
    ingredientId: ingredients[27].id,
    amount: 2,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[29].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[29].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper

  // Garlic Shrimp
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[30].id,
    ingredientId: ingredients[4].id,
    amount: 200,
    unit: 'g',
  }, // Shrimp
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[30].id,
    ingredientId: ingredients[17].id,
    amount: 3,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[30].id,
    ingredientId: ingredients[7].id,
    amount: 15,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[30].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[30].id,
    ingredientId: ingredients[15].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Black Pepper

  // Pork Chops
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[31].id,
    ingredientId: ingredients[2].id,
    amount: 250,
    unit: 'g',
  }, // Pork
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[31].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[31].id,
    ingredientId: ingredients[15].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Black Pepper
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[31].id,
    ingredientId: ingredients[27].id,
    amount: 2,
    unit: 'tbsp',
  }, // Olive Oil

  // Veggie Wrap
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[32].id,
    ingredientId: ingredients[23].id,
    amount: 50,
    unit: 'g',
  }, // Lettuce
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[32].id,
    ingredientId: ingredients[24].id,
    amount: 50,
    unit: 'g',
  }, // Cucumber
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[32].id,
    ingredientId: ingredients[25].id,
    amount: 50,
    unit: 'g',
  }, // Bell Pepper
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[32].id,
    ingredientId: ingredients[43].id,
    amount: 1,
    unit: 'pcs',
  }, // Bread (wrap)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[32].id,
    ingredientId: ingredients[34].id,
    amount: 1,
    unit: 'tsp',
  }, // Honey (dressing)

  // Chicken Alfredo
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[33].id,
    ingredientId: ingredients[0].id,
    amount: 200,
    unit: 'g',
  }, // Chicken Breast
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[33].id,
    ingredientId: ingredients[41].id,
    amount: 200,
    unit: 'g',
  }, // Pasta
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[33].id,
    ingredientId: ingredients[11].id,
    amount: 100,
    unit: 'ml',
  }, // Cream
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[33].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[33].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Egg Salad
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[34].id,
    ingredientId: ingredients[5].id,
    amount: 3,
    unit: 'pcs',
  }, // Eggs
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[34].id,
    ingredientId: ingredients[21].id,
    amount: 1,
    unit: 'pcs',
  }, // Tomato
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[34].id,
    ingredientId: ingredients[23].id,
    amount: 30,
    unit: 'g',
  }, // Lettuce
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[34].id,
    ingredientId: ingredients[14].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[34].id,
    ingredientId: ingredients[15].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Black Pepper

  // Lentil Soup
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[35].id,
    ingredientId: ingredients[41].id,
    amount: 150,
    unit: 'g',
  }, // Rice (optional for thickness)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[35].id,
    ingredientId: ingredients[19].id,
    amount: 1,
    unit: 'pcs',
  }, // Carrot
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[35].id,
    ingredientId: ingredients[18].id,
    amount: 1,
    unit: 'pcs',
  }, // Onion
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[35].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[35].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // BBQ Ribs
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[36].id,
    ingredientId: ingredients[2].id,
    amount: 500,
    unit: 'g',
  }, // Pork
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[36].id,
    ingredientId: ingredients[34].id,
    amount: 2,
    unit: 'tbsp',
  }, // Honey (sauce)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[36].id,
    ingredientId: ingredients[27].id,
    amount: 2,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[36].id,
    ingredientId: ingredients[14].id,
    amount: 1,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[36].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper

  // Avocado Toast (1)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[37].id,
    ingredientId: ingredients[43].id,
    amount: 2,
    unit: 'slices',
  }, // Bread
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[37].id,
    ingredientId: ingredients[44].id,
    amount: 1,
    unit: 'pcs',
  }, // Banana (or Avocado if available)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[37].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[37].id,
    ingredientId: ingredients[14].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Salt

  // Avocado Toast (2)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[38].id,
    ingredientId: ingredients[43].id,
    amount: 2,
    unit: 'slices',
  }, // Bread
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[38].id,
    ingredientId: ingredients[44].id,
    amount: 1,
    unit: 'pcs',
  }, // Banana (or Avocado)
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[38].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[38].id,
    ingredientId: ingredients[14].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Salt

  // Chocolate Brownie
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[39].id,
    ingredientId: ingredients[42].id,
    amount: 100,
    unit: 'g',
  }, // Chocolate
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[39].id,
    ingredientId: ingredients[6].id,
    amount: 100,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[39].id,
    ingredientId: ingredients[5].id,
    amount: 2,
    unit: 'pcs',
  }, // Eggs
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[39].id,
    ingredientId: ingredients[7].id,
    amount: 50,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeVersionId: recipeVersions[39].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
].map((item) => ({ ...item, id: uuidv4() }));

export let ratingsResult: Rating[] = [];
for (const recipe of recipes) {
  const shuffledAuthorIds = faker.helpers.shuffle(authorsIds);

  const ratingsCount = faker.number.int({ min: 3, max: shuffledAuthorIds.length });

  const recipeRatings = shuffledAuthorIds.slice(0, ratingsCount).map((userId) => ({
    id: uuidv4(),
    userId,
    recipeId: recipe.id,
    value: faker.number.int({ min: 1, max: 5 }),
  }));

  recipe.ratingsCount = ratingsCount;
  recipe.ratingsSum = recipeRatings.reduce((acc, curr) => (acc += curr.value), 0);
  recipe.ratingsAvg = recipe.ratingsSum / ratingsCount;

  ratingsResult = [...ratingsResult, ...recipeRatings];
}

export const ratings: Rating[] = ratingsResult;
