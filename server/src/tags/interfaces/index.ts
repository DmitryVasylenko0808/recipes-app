import { Tag } from 'src/generated/prisma/client';

export interface ITagsRepository {
  findMany(): Promise<Tag[]>;
}
