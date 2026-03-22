import { useEffect, useState } from 'react';

type PaginationOptions = {
  initialPage?: number;
  initialLimit?: number;
  resetDependecies?: unknown[];
};
export const usePagination = ({
  initialPage = 1,
  initialLimit = 10,
  resetDependecies = [],
}: PaginationOptions) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    setPage(1);
  }, [limit, ...resetDependecies]);

  const onPageChange = (page: number) => setPage(page);
  const onLimitChange = (limit: number) => setLimit(limit);

  return { page, limit, onPageChange, onLimitChange };
};
