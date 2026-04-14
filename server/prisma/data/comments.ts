import { CommentUncheckedCreateInput } from 'src/generated/prisma/models';
import { authors } from './authors';
import { recipes } from './recipes';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

const authorIds = authors.map((a) => a.id);
const recipeIds = recipes.slice(0, 10).map((r) => r.id);

export const comments: CommentUncheckedCreateInput[] = Array.from({ length: 250 }).map(() => {
  const data: any = {
    id: uuidv4(),
    userId: faker.helpers.arrayElement(authorIds),
    recipeId: faker.helpers.arrayElement(recipeIds),
    content: faker.lorem.sentences({ min: 1, max: 10 }),
    createdAt: faker.date.past({ years: 1 }),
  };

  data.updatedAt = data.createdAt;

  return data;
});
