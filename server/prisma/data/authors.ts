import { faker } from '@faker-js/faker';
import { createAuthor } from 'prisma/factories';
import { v4 as uuidv4 } from 'uuid';

faker.seed(1);

export const authors = [
  createAuthor({ passwordHash: '11111111', avatar: 'a0.png' }),
  createAuthor({ passwordHash: '22222222', avatar: 'a1.png' }),
  createAuthor({ passwordHash: '33333333', avatar: 'a2.png' }),
  ...Array.from({ length: 15 }).map(() => createAuthor({ avatar: null })),
].map((item) => ({ ...item, id: uuidv4() }));
