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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'Successfully registered', type: RegisterAuthorResponseDto })
  @ApiConflictResponse({ description: 'Author with inputed email is already exists' })
  async registerAuthor(@Body() dto: RegisterAuthorRequestDto) {
    const data = await this.authService.registerAuthor(dto);
    return new RegisterAuthorResponseDto(data);
  }

  @Post('sign-in')
  @ApiOkResponse({ description: 'Successfully signed in', type: SignInAuthorResponseDto })
  @ApiNotFoundResponse({ description: "Author with inputed email doesn't exist" })
  @ApiBadRequestResponse({ description: 'Invalid password' })
  async signInAuthor(@Body() dto: SignInAuthorRequestDto) {
    const data = await this.authService.signInAuthor(dto);
    return new SignInAuthorResponseDto(data);
  }

  @Get('me')
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GetMeDto })
  @ApiNotFoundResponse({ description: 'Author is not found' })
  async getMe(@CurrentUser('id') authorId: string) {
    const data = await this.authService.getMe(authorId);
    return new GetMeDto(data);
  }
}
