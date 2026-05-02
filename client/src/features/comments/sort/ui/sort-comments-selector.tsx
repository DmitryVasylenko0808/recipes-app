import type { SortPreset } from '@/entities/comments';
import { Selector } from '@/shared';
import { ArrowUpDown } from 'lucide-react';
import type { SortCommentOption } from '../model/types';

type SortCommentSelectorProps = {
  sortOptions: SortCommentOption[];
  onChangeSort: (sort: SortPreset) => void;
};

export const SortCommentSelector = ({ sortOptions, onChangeSort }: SortCommentSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      <ArrowUpDown size={20} />
      <Selector
        options={sortOptions}
        onChange={(e) => onChangeSort(e.target.value as SortPreset)}
      />
    </div>
  );
};
