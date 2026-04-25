import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthorsRepository } from './authors.repository';
import { RecipesModule } from 'src/recipes/recipes.module';
import { AuthorsMapper } from './mappers/authors.mapper';

@Module({
  imports: [PrismaModule, RecipesModule],
  providers: [AuthorsService, AuthorsRepository, AuthorsMapper],
  controllers: [AuthorsController],
  exports: [AuthorsService, AuthorsMapper, AuthorsRepository],
})
export class AuthorsModule {}
