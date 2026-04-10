import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

export class AuthorPreviewDto {
  @ApiProperty({
    description: 'Unique identifier of author',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @Exclude()
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
    description: "Author's avatar",
    example: 'Collins',
  })
  @Transform(({ value }) => (value ? `${process.env.SERVER_UPLOADS_URL}/${value}` : null))
  avatar: string | null;

  @Exclude()
  bio: string | null;

  @Exclude()
  createdAt: Date;

  constructor(partial: Partial<AuthorPreviewDto>) {
    Object.assign(this, partial);
  }
}
