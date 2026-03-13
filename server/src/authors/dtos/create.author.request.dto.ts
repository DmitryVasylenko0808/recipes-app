import { IsEmail, IsString, MinLength } from 'class-validator';

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
