import { Exclude } from 'class-transformer';
import { Author } from 'src/generated/prisma/client';

export class GetOneAuthorDto implements Author {
  id: string;

  email: string;

  @Exclude()
  passwordHash: string;

  firstname: string;

  secondname: string;

  bio: string | null;

  avatar: string | null;

  createdAt: Date;

  constructor(partial: Partial<GetOneAuthorDto>) {
    Object.assign(this, partial);
  }
}
