import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';

type BadgeProps = { variant: 'primary' | 'secondary' | 'terciary' } & ComponentProps<'span'>;

export const Badge = ({ variant, children, className }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center justify-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
      {
        'bg-primary text-primary-foreground': variant === 'primary',
        'bg-secondary': variant === 'secondary',
        'border-ring/30 border': variant === 'terciary',
      },
      className
    )}
  >
    {children}
  </span>
);
