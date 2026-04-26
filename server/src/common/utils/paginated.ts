import { PaginatedResponseDto } from '../interfaces/paginated.response.dto';

type PaginatedArgs<T> = {
  data: T[];
  limit: number;
  totalCount: number;
  page: number;
};

export const paginated = <T>(args: PaginatedArgs<T>): PaginatedResponseDto<T> => {
  const { data, limit, totalCount, page } = args;

  return {
    data,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
};
