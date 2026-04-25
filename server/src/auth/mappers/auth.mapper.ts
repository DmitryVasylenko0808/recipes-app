import { Injectable } from '@nestjs/common';
import { GetMeDto, RegisterAuthorResponseDto, SignInAuthorResponseDto } from '../dtos';
import { Author } from 'src/generated/prisma/client';

@Injectable()
export class AuthMapper {
  toRegisterDto(data: { accessToken: string }): RegisterAuthorResponseDto {
    return { accessToken: data.accessToken };
  }

  toSignInDto(data: { accessToken: string }): SignInAuthorResponseDto {
    return { accessToken: data.accessToken };
  }

  toGetMeDto(data: Author): GetMeDto {
    return {
      id: data.id,
      firstname: data.firstname,
      secondname: data.secondname,
      avatar: data.avatar ? `${process.env.SERVER_UPLOADS_URL}/${data.avatar}` : null,
      email: data.email,
    };
  }
}
