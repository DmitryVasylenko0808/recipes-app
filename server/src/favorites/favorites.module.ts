import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesController } from './favorites.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FavoritesController],
  providers: [FavoritesRepository, FavoritesService],
})
export class FavoritesModule {}
