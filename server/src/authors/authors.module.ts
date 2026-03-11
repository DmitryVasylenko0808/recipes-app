import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthorsRepository } from './authors.repository';

@Module({
  imports: [PrismaModule],
  providers: [AuthorsService, AuthorsRepository],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
