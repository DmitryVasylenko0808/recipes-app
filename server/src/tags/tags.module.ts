import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TagsRepository } from './tags.repository';
import { TagsMapper } from './mappers/tags.mapper';

@Module({
  imports: [PrismaModule],
  controllers: [TagsController],
  providers: [TagsService, TagsRepository, TagsMapper],
})
export class TagsModule {}
