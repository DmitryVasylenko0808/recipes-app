import { PaginatedResponseDto } from 'src/common/interfaces/paginated.response.dto';
import { CommentResponseDto } from './comment.response.dto';

export class GetCommentsResponseDto extends PaginatedResponseDto<CommentResponseDto> {}
