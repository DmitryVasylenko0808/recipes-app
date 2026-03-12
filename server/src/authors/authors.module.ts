import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthorsRepository } from './authors.repository';
import { RecipesModule } from 'src/recipes/recipes.module';

@Module({
  imports: [PrismaModule, RecipesModule],
  providers: [AuthorsService, AuthorsRepository],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
export class AuthorsModule {}
