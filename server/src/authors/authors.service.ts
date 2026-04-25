import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsRepository } from './authors.repository';
import * as bcrypt from 'bcrypt';
import {
  CreateAuthorRequestDto,
  GetAuthorResponseDto,
  UpdateAuthorRequestDto,
  UpdateAuthorResponseDto,
} from './dtos';
import { AuthorsMapper } from './mappers/authors.mapper';

@Injectable()
export class AuthorsService {
  constructor(
    private readonly authorsRepository: AuthorsRepository,
    private readonly authorsMapper: AuthorsMapper
  ) {}

  async getAuthorById(id: string) {
    const author = await this.authorsRepository.findById(id);

    if (!author) throw new NotFoundException('Author is not found');

    return this.authorsMapper.toDetailsDto(author);
  }

  async getAuthorByEmail(email: string) {
    const author = await this.authorsRepository.findOneBy('email', email);

    if (!author) throw new NotFoundException("Author with this email doesn't exist");

    return author;
  }

  async createAuthor(data: CreateAuthorRequestDto) {
    const authorWithTakenEmail = await this.authorsRepository.findOneBy('email', data.email);

    if (authorWithTakenEmail)
      throw new ConflictException('Author with this email is already exists');

    const { password, ...authorData } = data;

    return await this.authorsRepository.create({
      ...authorData,
      passwordHash: await bcrypt.hash(password, 5),
    });
  }

  async updateAuthor(authorId: string, data: UpdateAuthorRequestDto, avatarFilename?: string) {
    const author = await this.authorsRepository.update(authorId, {
      ...data,
      avatar: avatarFilename,
    });

    return this.authorsMapper.toDetailsDto(author);
  }
}
