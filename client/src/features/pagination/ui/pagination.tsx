import { Button } from '@/shared';
import { cn } from '@/shared/lib/utils/cn';

type PaginationProps = {
  totalPages?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
export const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  return (
    <>
      {totalPages && (
        <div className="mt-6 flex justify-center">
          <div className="flex gap-2">
            {currentPage !== 1 && (
              <Button as="button" variant="text" onClick={() => onPageChange(currentPage - 1)}>
                Prev
              </Button>
            )}
            {Array.from({ length: totalPages }).map((_, pageNumber) => (
              <Button
                as="button"
                variant="text"
                className={cn({ 'bg-accent': currentPage === pageNumber + 1 })}
                onClick={() => onPageChange(pageNumber + 1)}
                key={pageNumber}
              >
                {pageNumber + 1}
              </Button>
            ))}
            {currentPage !== totalPages && (
              <Button as="button" variant="text" onClick={() => onPageChange(currentPage + 1)}>
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
