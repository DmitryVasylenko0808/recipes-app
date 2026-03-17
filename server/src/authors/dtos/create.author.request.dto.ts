import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAuthorRequestDto {
  @ApiProperty({
    description: 'Author`s email',
    example: 'authoremail@mail.com',
  })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({
    description: 'Author`s password, must contain at least 8 characters',
    example: 'somepassword',
    minLength: 8,
  })
  @IsString({ message: 'Invalid password' })
  @MinLength(8, { message: 'Password must contain at least $constraint1 characters' })
  readonly password: string;

  @ApiProperty({
    description: "Author's firstname",
    example: 'Michael',
  })
  @IsString({ message: 'Invalid firstname' })
  @MinLength(1, { message: 'Firstname must contain at least $contraint1 characters' })
  readonly firstname: string;

  @ApiProperty({
    description: "Author's secondname",
    example: 'Collins',
  })
  @IsString({ message: 'Invalid secondname' })
  @MinLength(1, { message: 'Secondname must contain at least $contraint1 characters' })
  readonly secondname: string;
}
