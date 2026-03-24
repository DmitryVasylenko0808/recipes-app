import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';

type LoaderProps = {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  center?: boolean;
} & ComponentProps<'span'>;

export const Loader = ({ variant, size, center, className, ...spanProps }: LoaderProps) => {
  const content = (
    <span
      className={cn(
        'inline-block animate-spin rounded-full border-r-transparent',
        {
          'border-primary border-r-transparent': variant === 'primary',
          'h-4.5 w-4.5 border-2': size === 'sm',
          'h-6 w-6 border-3': size === 'md',
          'h-12 w-12 border-5': size === 'lg',
        },
        className
      )}
      {...spanProps}
    />
  );

  return center ? <div className="flex justify-center">{content}</div> : content;
};
