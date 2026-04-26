export class PaginatedResponseDto<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
