import { cn } from '@/shared/lib/utils/cn';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ComponentProps } from 'react';

type PaginationProps = {
  totalPages?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
export const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  return (
    <>
      {!!totalPages && totalPages > 1 && (
        <nav className="mt-6 flex justify-center">
          <ul className="flex gap-2">
            <li>
              <PaginationButton
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
              >
                <ArrowLeft size={20} />
              </PaginationButton>
            </li>
            {Array.from({ length: totalPages }).map((_, pageNumber) => (
              <li key={pageNumber}>
                <PaginationButton
                  isActive={currentPage === pageNumber + 1}
                  onClick={() => onPageChange(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </PaginationButton>
              </li>
            ))}
            <li>
              <PaginationButton
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
              >
                <ArrowRight size={20} />
              </PaginationButton>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

type PaginationButtonProps = ComponentProps<'button'> & {
  isActive?: boolean;
};
const PaginationButton = ({
  isActive,
  className,
  children,
  ...btnProps
}: PaginationButtonProps) => {
  return (
    <button
      className={cn(
        'hover:bg-accent inline-flex h-10 cursor-pointer items-center gap-2 rounded-md px-4 font-medium duration-100 disabled:opacity-50 disabled:hover:bg-transparent',
        { 'bg-accent': isActive }
      )}
      {...btnProps}
    >
      {children}
    </button>
  );
};
