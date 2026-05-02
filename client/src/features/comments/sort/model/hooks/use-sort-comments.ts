import type { SortPreset } from '@/entities/comments';
import { useState, useMemo } from 'react';
import type { SortCommentOption } from '../types';

export const useSortComments = () => {
  const [sort, setSort] = useState<SortPreset>('newest');

  const sortOptions: SortCommentOption[] = useMemo(
    () => [
      { value: 'newest', label: 'Newest' },
      { value: 'popular', label: 'Popular' },
    ],
    []
  );

  const onChangeSort = (sort: SortPreset) => setSort(sort);

  return { sort, sortOptions, onChangeSort };
};
