export class CommentResponseDto {
  id: string;
  userId: string;
  recipeId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<CommentResponseDto>) {
    Object.assign(this, partial);
  }
}
