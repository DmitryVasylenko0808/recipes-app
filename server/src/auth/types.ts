import { Author } from 'src/generated/prisma/client';

export type AccessTokenPayload = Pick<Author, 'id'>;
