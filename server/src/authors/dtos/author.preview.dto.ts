import { Exclude } from 'class-transformer';

export class AuthorPreviewDto {
  id: string;

  @Exclude()
  email: string;

  @Exclude()
  passwordHash: string;

  firstname: string;
  secondname: string;
  avatar: string | null;

  @Exclude()
  bio: string | null;

  @Exclude()
  createdAt: Date;

  constructor(partial: Partial<AuthorPreviewDto>) {
    Object.assign(this, partial);
  }
}
