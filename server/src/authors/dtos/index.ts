import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Author } from 'src/generated/prisma/client';

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

export class AuthorDto implements Author {
  id: string;

  email: string;

  @Exclude()
  passwordHash: string;

  firstname: string;

  secondname: string;

  bio: string | null;

  avatar: string | null;

  createdAt: Date;

  constructor(partial: Partial<AuthorDto>) {
    Object.assign(this, partial);
  }
}

export class GetAuthorRequestDto extends AuthorDto {}

export class CreateAuthorRequestDto {
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsString({ message: 'Invalid password' })
  @MinLength(8, { message: 'Password must contain at least $constraint1 characters' })
  readonly password: string;

  @IsString({ message: 'Invalid firstname' })
  @MinLength(1, { message: 'Firstname must contain at least $contraint1 characters' })
  readonly firstname: string;

  @IsString({ message: 'Invalid secondname' })
  @MinLength(1, { message: 'Secondname must contain at least $contraint1 characters' })
  readonly secondname: string;
}

export class UpdateAuthorRequestDto {
  @IsOptional()
  @IsString({ message: 'Invalid firstname' })
  @MinLength(1, { message: 'Firstname must contain at least $contraint1 characters' })
  readonly firstname?: string;

  @IsOptional()
  @IsString({ message: 'Invalid secondname' })
  @MinLength(1, { message: 'Secondname must contain at least $contraint1 characters' })
  readonly secondname?: string;

  @IsOptional()
  readonly description?: string;
}

export class UpdateAuthorResponseDto extends AuthorDto {}
