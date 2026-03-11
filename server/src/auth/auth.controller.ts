import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterAuthorRequestDto,
  RegisterAuthorResponseDto,
  SignInAuthorRequestDto,
  SignInAuthorResponseDto,
} from './dtos';

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
}
