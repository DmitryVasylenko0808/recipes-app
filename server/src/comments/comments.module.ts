import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentRepository } from './comment.repository';
import { RecipesModule } from 'src/recipes/recipes.module';

@Module({
  imports: [PrismaModule, RecipesModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository],
})
export class CommentsModule {}
