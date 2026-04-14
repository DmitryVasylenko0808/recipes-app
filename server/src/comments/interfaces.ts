import { Author, Comment } from 'src/generated/prisma/client';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';
import { CommentWhereInput } from 'src/generated/prisma/models';

export type CommentFindManyResultItem = Comment & { user: Author };

export interface ICommentsRepository {
  findManyByRecipeId(
    recipeId: string,
    options: GetCommentsQueryDto
  ): Promise<CommentFindManyResultItem[]>;
  count(filter?: CommentWhereInput): Promise<number>;
}
