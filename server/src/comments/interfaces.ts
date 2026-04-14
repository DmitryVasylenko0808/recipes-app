import { Author, Comment } from 'src/generated/prisma/client';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';
import {
  CommentUncheckedCreateInput,
  CommentUncheckedUpdateInput,
  CommentWhereInput,
} from 'src/generated/prisma/models';

export type CommentFindManyResultItem = Comment & { user: Author };

export interface ICommentsRepository {
  findManyByRecipeId(
    recipeId: string,
    options: GetCommentsQueryDto
  ): Promise<CommentFindManyResultItem[]>;
  findOneById(id: string): Promise<Comment | null>;
  create(data: CommentUncheckedCreateInput): Promise<Comment>;
  update(id: string, data: CommentUncheckedUpdateInput): Promise<Comment>;
  count(filter?: CommentWhereInput): Promise<number>;
}
