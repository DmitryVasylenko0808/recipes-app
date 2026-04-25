import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthorsModule } from 'src/authors/authors.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtRegisterOptions } from './utils/jwt-register-options';
import { JwtStrategy } from './jwt-strategy';
import { AuthMapper } from './mappers/auth.mapper';

@Module({
  imports: [AuthorsModule, JwtModule.registerAsync(jwtRegisterOptions)],
  controllers: [AuthController],
  providers: [AuthService, AuthMapper, JwtStrategy],
})
export class AuthModule {}
