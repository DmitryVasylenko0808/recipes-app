import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  GetMeDto,
  RegisterAuthorRequestDto,
  RegisterAuthorResponseDto,
  SignInAuthorRequestDto,
  SignInAuthorResponseDto,
} from './dtos';
import { PrivateAuthGuard } from 'src/common/private-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerAuthor(@Body() dto: RegisterAuthorRequestDto) {
    const data = await this.authService.registerAuthor(dto);
    return new RegisterAuthorResponseDto(data);
  }

  @Post('sign-in')
  async signInAuthor(@Body() dto: SignInAuthorRequestDto) {
    const data = await this.authService.signInAuthor(dto);
    return new SignInAuthorResponseDto(data);
  }

  @Get('me')
  @UseGuards(PrivateAuthGuard)
  async getMe(@CurrentUser('id') authorId: string) {
    const data = await this.authService.getMe(authorId);
    return new GetMeDto(data);
  }
}
