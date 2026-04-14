import { IsNotEmpty } from 'class-validator';

export class PostCommentRequestDto {
  @IsNotEmpty({ message: 'Content is required' })
  content: string;
}
