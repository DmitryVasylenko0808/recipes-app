import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { IngredientsRepository } from './ingredients.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IngredientsMapper } from './mappers/ingredients.mappet';

@Module({
  imports: [PrismaModule],
  controllers: [IngredientsController],
  providers: [IngredientsService, IngredientsRepository, IngredientsMapper],
})
export class IngredientsModule {}
