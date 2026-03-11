import { Author } from 'src/generated/prisma/client';
import { AuthorCreateInput, AuthorUpdateInput } from 'src/generated/prisma/models';

type AuthorCreateData = AuthorCreateInput;
type AuthorUpdateData = AuthorUpdateInput;

export interface IAuthorsRepository {
  findById(id: string): Promise<Author | null>;
  findOneBy<K extends keyof Author, V extends Author[K]>(key: K, value: V): Promise<Author | null>;
  create(data: AuthorCreateData): Promise<Author>;
  update(data: AuthorUpdateData): Promise<Author>;
}
