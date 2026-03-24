import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';

type CardProps = ComponentProps<'div'>;

export const Card = ({ children, className, ...divProps }: CardProps) => {
  return (
    <div
      className={cn('bg-card border-ring/30 text-card-foreground rounded-xl border', className)}
      {...divProps}
    >
      {children}
    </div>
  );
};
