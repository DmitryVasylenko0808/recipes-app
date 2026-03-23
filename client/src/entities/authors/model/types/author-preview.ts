import type { Author } from './author';

export type AuthorPreview = Pick<Author, 'id' | 'firstname' | 'secondname' | 'avatar'>;
