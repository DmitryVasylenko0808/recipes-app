export interface PaginatedResponseDto<T> {
  data: T[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
}
