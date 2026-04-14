import { AuthorPreviewDto } from 'src/authors/dtos';
import { PaginatedResponseDto } from 'src/recipes/dtos';

export class GetCommentsResponseItemDto {
  id: string;
  userId: string;
  user: AuthorPreviewDto;
  recipeId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<GetCommentsResponseItemDto>) {
    const { user, ...rest } = partial;

    Object.assign(this, rest);

    if (user) this.user = new AuthorPreviewDto(user);
  }
}

export class GetCommentsResponseDto implements PaginatedResponseDto<GetCommentsResponseItemDto> {
  data: GetCommentsResponseItemDto[];
  totalCount: number;
  totalPage: number;
  currentPage: number;

  constructor(partial: GetCommentsResponseDto) {
    const { data, ...rest } = partial;

    Object.assign(this, rest);

    this.data = data.map((item) => new GetCommentsResponseItemDto(item));
  }
}
