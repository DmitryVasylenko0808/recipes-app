import { faker } from '@faker-js/faker';
import { Author } from 'src/generated/prisma/client';
import { AuthorCreateInput } from 'src/generated/prisma/models';
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
