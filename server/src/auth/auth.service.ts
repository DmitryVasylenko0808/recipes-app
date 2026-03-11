import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import { RegisterAuthorRequestDto, SignInAuthorRequestDto } from './dtos';
import { Author } from 'src/generated/prisma/client';
import { AccessTokenPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly jwtService: JwtService
  ) {}

  async registerAuthor(data: RegisterAuthorRequestDto) {
    const registeredAuthor = await this.authorsService.createAuthor(data);

    return await this.generateAccesToken(registeredAuthor);
  }

  async signInAuthor(data: SignInAuthorRequestDto) {
    const author = await this.authorsService.getAuthorByEmail(data.email);

    await this.verifyPasswords(data.password, author.passwordHash);

    return await this.generateAccesToken(author);
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
}
