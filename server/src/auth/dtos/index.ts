import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform, Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { CreateAuthorRequestDto } from 'src/authors/dtos/create.author.request.dto';

export class RegisterAuthorRequestDto extends CreateAuthorRequestDto {}

export class SignInAuthorRequestDto {
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
  readonly password: string;
}

export class RegisterAuthorResponseDto {
  @ApiProperty({
    description: 'Access token for private API routes',
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA3Z
      WFhM2JlLTlmMzYtNDM1Ni1hMmU0LTdkNzBlMTRmODk1OSIsImlh
      dCI6MTc3MzU3ODI3NiwiZXhwIjoxNzczNjY0Njc2fQ.KT-F6De7
      lItw8PwqKymDeQwav3N-olTTxZkqDh4HUOk`,
  })
  accessToken: string;

  constructor(partial: Partial<RegisterAuthorResponseDto>) {
    Object.assign(this, partial);
  }
}

export class SignInAuthorResponseDto extends RegisterAuthorResponseDto {}

export class GetMeDto {
  @ApiProperty({
    description: 'Unique identifier of author',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: "Author's firstname",
    example: 'Michael',
  })
  firstname: string;

  @ApiProperty({
    description: "Author's secondname",
    example: 'Collins',
  })
  secondname: string;

  @ApiProperty({
    type: 'string',
    description: "Author's avatar",
    example: 'https://avatars.githubusercontent.com/u/96959575',
    nullable: true,
  })
  @Transform(({ value }) => (value ? `${process.env.SERVER_UPLOADS_URL}/${value}` : null))
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
