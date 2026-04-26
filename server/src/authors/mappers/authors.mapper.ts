import { Injectable } from '@nestjs/common';
import { Author } from 'src/generated/prisma/client';
import { AuthorDetailsDto, AuthorPreviewDto } from '../dtos';
import { transformImage } from 'src/common/utils/transform-image';

@Injectable()
export class AuthorsMapper {
  toPreviewDto(author: Author): AuthorPreviewDto {
    return {
      id: author.id,
      firstname: author.firstname,
      secondname: author.secondname,
      avatar: transformImage(author.avatar),
    };
  }

  toDetailsDto(author: Author): AuthorDetailsDto {
    return {
      id: author.id,
      email: author.email,
      firstname: author.firstname,
      secondname: author.secondname,
      bio: author.bio,
      avatar: transformImage(author.avatar),
      createdAt: author.createdAt,
    };
  }
}
