import { Module } from '@nestjs/common';
import { RecipesService } from './services/recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipesRepository } from './repositories/recipes.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentsModule } from 'src/comments/comments.module';
import { RatingsService } from './services/ratings.service';
import { RatingsRepository } from './repositories/ratings.repository';
import { RecipesMapper } from './mappers/recipes.mapper';
import { RatingsMapper } from './mappers/ratings.mapper';

@Module({
  imports: [PrismaModule, CommentsModule],
  controllers: [RecipesController],
  providers: [
    RecipesService,
    RecipesRepository,
    RatingsService,
    RatingsRepository,
    RecipesMapper,
    RatingsMapper,
  ],
  exports: [RecipesService, RecipesMapper],
})
export class RecipesModule {}
