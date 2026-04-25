import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import { RegisterAuthorRequestDto, SignInAuthorRequestDto } from './dtos';
import { Author } from 'src/generated/prisma/client';
import { AccessTokenPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthMapper } from './mappers/auth.mapper';
import { AuthorsRepository } from 'src/authors/authors.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly jwtService: JwtService,
    private readonly authorRepository: AuthorsRepository,
    private readonly authMapper: AuthMapper
  ) {}

  async registerAuthor(data: RegisterAuthorRequestDto) {
    const registeredAuthor = await this.authorsService.createAuthor(data);
    const accessToken = await this.generateAccesToken(registeredAuthor);

    return this.authMapper.toRegisterDto(accessToken);
  }

  async signInAuthor(data: SignInAuthorRequestDto) {
    const author = await this.authorsService.getAuthorByEmail(data.email);

    await this.verifyPasswords(data.password, author.passwordHash);

    const accessToken = await this.generateAccesToken(author);

    return this.authMapper.toSignInDto(accessToken);
  }

  async generateAccesToken(author: Author) {
    const tokenPayload: AccessTokenPayload = { id: author.id };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken };
  }

  async verifyPasswords(password: string, passwordHash: string) {
    const isValidPass = await bcrypt.compare(password, passwordHash);

    if (!isValidPass) throw new BadRequestException('Invalid password');
  }

  async getMe(id: string) {
    const me = await this.authorRepository.findById(id);

    if (!me) throw new BadRequestException('Cannot get auth credentials');

    return this.authMapper.toGetMeDto(me);
  }
}
