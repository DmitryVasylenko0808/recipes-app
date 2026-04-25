import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriesMapper } from './mappers/categories.mapper';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, CategoriesMapper],
})
export class CategoriesModule {}
