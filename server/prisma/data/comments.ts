import { CommentUncheckedCreateInput } from 'src/generated/prisma/models';
import { authors } from './authors';
import { recipes } from './recipes';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { Comment, CommentLike } from 'src/generated/prisma/client';

const authorIds = authors.map((a) => a.id);
const recipeIds = recipes.slice(0, 10).map((r) => r.id);

export const comments: Comment[] = Array.from({ length: 250 }).map(() => {
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

export let commentLikesResult: CommentLike[] = [];
for (const comment of comments.slice(0, 50)) {
  const shuffledAuthorIds = faker.helpers.shuffle(authorIds);

  const likesCount = faker.number.int({ min: 1, max: shuffledAuthorIds.length });
  const commentLikes = shuffledAuthorIds.slice(0, likesCount).map((userId) => ({
    userId,
    commentId: comment.id,
  }));

  comment.likesCount = likesCount;

  commentLikesResult = [...commentLikesResult, ...commentLikes];
}

export const commentLikes = commentLikesResult;
