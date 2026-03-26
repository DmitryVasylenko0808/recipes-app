import { useState, type ComponentProps, type ReactNode } from 'react';
import { cn } from '../lib/utils/cn';
import { ChevronDown, ChevronUp } from 'lucide-react';

type CollapsibleProps = ComponentProps<'div'> & {
  preview: ReactNode;
  full: ReactNode;
};

export const Collapsible = ({ preview, full, className, ...divProps }: CollapsibleProps) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow((prev) => !prev);

  return (
    <div className={cn('', className)} {...divProps}>
      <div className="relative">
        {preview}
        {!show && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-white from-5% to-transparent" />
        )}
      </div>
      {show && full}
      <div className="mt-3">
        <button
          className="text-muted-foreground border-t-ring/30 flex w-full items-center justify-center gap-1 border-t py-2 text-xs"
          onClick={handleClick}
        >
          {show ? (
            <>
              Show less <ChevronUp size={16} />
            </>
          ) : (
            <>
              Show more <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
