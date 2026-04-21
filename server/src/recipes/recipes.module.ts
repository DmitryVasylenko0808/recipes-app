import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipesRepository } from './recipes.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentsModule } from 'src/comments/comments.module';
import { RatingsService } from './ratings.service';
import { RatingsRepository } from './ratings.repository';

@Module({
  imports: [PrismaModule, CommentsModule],
  controllers: [RecipesController],
  providers: [RecipesService, RecipesRepository, RatingsService, RatingsRepository],
  exports: [RecipesService],
})
export class RecipesModule {}
