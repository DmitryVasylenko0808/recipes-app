import { Exclude } from 'class-transformer';
import { Author } from 'src/generated/prisma/client';

export class AuthorDetailsDto implements Author {
  id: string;
  email: string;

  @Exclude()
  passwordHash: string;

  firstname: string;
  secondname: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;

  constructor(partial: Partial<AuthorDetailsDto>) {
    Object.assign(this, partial);
  }
}
