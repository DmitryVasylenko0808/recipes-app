import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

export class AuthorDetailsDto {
  @ApiProperty({
    description: 'Unique identifier of author',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: 'Author`s email',
    example: 'authoremail@mail.com',
  })
  email: string;

  @Exclude()
  passwordHash: string;

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
    description: 'About author',
    example:
      'Passionate Italian chef with over 15 years of experience in traditional Italian cuisine. Specializes in pasta dishes and authentic recipes passed down through generations.',
    nullable: true,
    type: 'string',
  })
  bio: string | null;

  @ApiProperty({
    type: 'string',
    description: "Author's avatar",
    nullable: true,
  })
  @Transform(({ value }) => (value ? `${process.env.SERVER_UPLOADS_URL}/${value}` : null))
  avatar: string | null;

  @ApiProperty({
    type: Date,
    description: 'Date of registering author',
    example: '2026-03-17T13:21:11.617Z',
  })
  createdAt: Date;

  constructor(partial: Partial<AuthorDetailsDto>) {
    Object.assign(this, partial);
  }
}
