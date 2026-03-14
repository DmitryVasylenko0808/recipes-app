import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { CreateAuthorRequestDto } from 'src/authors/dtos/create.author.request.dto';

export class RegisterAuthorRequestDto extends CreateAuthorRequestDto {}

export class SignInAuthorRequestDto {
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsString({ message: 'Invalid password' })
  readonly password: string;
}

export class RegisterAuthorResponseDto {
  accessToken: string;

  constructor(partial: Partial<RegisterAuthorResponseDto>) {
    Object.assign(this, partial);
  }
}

export class SignInAuthorResponseDto extends RegisterAuthorResponseDto {}

export class GetMeDto {
  id: string;
  firstname: string;
  secondname: string;
  avatar: string | null;

  @Exclude()
  email: string;
  @Exclude()
  passwordHash: string;
  @Exclude()
  bio: string | null;
  @Exclude()
  createdAt: Date;

  constructor(partial: Partial<GetMeDto>) {
    Object.assign(this, partial);
  }
}
