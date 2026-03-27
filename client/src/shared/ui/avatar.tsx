import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';

type AvatarProps = ComponentProps<'img'> & { size: 'sm' | 'md' | 'lg' };

export const Avatar = ({ size, className, ...imgProps }: AvatarProps) => {
  return (
    <img
      className={cn(
        'rounded-full',
        {
          'h-10 w-10': size === 'sm',
          'h-14 w-14': size === 'md',
          'h-32 w-32': size === 'lg',
        },
        className
      )}
      {...imgProps}
    />
  );
};
