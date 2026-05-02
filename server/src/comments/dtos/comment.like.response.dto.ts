import { ApiProperty } from '@nestjs/swagger';

export class CommentLikeResponseDto {
  @ApiProperty({
    description: 'Unique identifier of comment',
    example: '94765ad0-80a9-4cc8-b4b2-5bdba27718a4',
  })
  commentId: string;

  @ApiProperty({
    description: 'Unique identifier of user',
    example: 'fbba2ba7-8fca-49a0-8c87-5451adde61e4',
  })
  userId: string;
}
