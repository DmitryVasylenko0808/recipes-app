import { Injectable } from '@nestjs/common';
import { Author } from 'src/generated/prisma/client';
import { AuthorDetailsDto, AuthorPreviewDto } from '../dtos';

@Injectable()
export class AuthorsMapper {
  toPreviewDto(author: Author): AuthorPreviewDto {
    return {
      id: author.id,
      firstname: author.firstname,
      secondname: author.secondname,
      avatar: author.avatar ? `${process.env.SERVER_UPLOADS_URL}/${author.avatar}` : null,
    };
  }

  toDetailsDto(author: Author): AuthorDetailsDto {
    return {
      id: author.id,
      email: author.email,
      firstname: author.firstname,
      secondname: author.secondname,
      bio: author.bio,
      avatar: author.avatar ? `${process.env.SERVER_UPLOADS_URL}/${author.avatar}` : null,
      createdAt: author.createdAt,
    };
  }
}
