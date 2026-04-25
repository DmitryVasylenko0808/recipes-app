import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesController } from './favorites.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecipesModule } from 'src/recipes/recipes.module';
import { FavoritesMapper } from './mappers/favorites.mapper';

@Module({
  imports: [PrismaModule, RecipesModule],
  controllers: [FavoritesController],
  providers: [FavoritesRepository, FavoritesService, FavoritesMapper],
})
export class FavoritesModule {}
