import { Author } from 'src/generated/prisma/client';
import { AuthorCreateInput, AuthorUpdateInput } from 'src/generated/prisma/models';

export type AuthorCreateData = AuthorCreateInput;
export type AuthorUpdateData = AuthorUpdateInput;

export interface IAuthorsRepository {
  findById(id: string): Promise<Author | null>;
  findOneBy<K extends keyof Author, V extends Author[K]>(key: K, value: V): Promise<Author | null>;
  create(data: AuthorCreateData): Promise<Author>;
  update(id: string, data: AuthorUpdateData): Promise<Author>;
}
