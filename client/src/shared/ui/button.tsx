import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';

export type ButtonProps = ComponentProps<'button'> & {
  variant: 'primary' | 'secondary' | 'menu' | 'text' | 'destructive' | 'menu-destructive';
  fullWidth?: true;
  isLoading?: boolean;
};

export const Button = ({
  variant = 'primary',
  fullWidth,
  isLoading,
  className,
  children,
  ...btnProps
}: Readonly<ButtonProps>) => {
  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center justify-center font-medium duration-100 disabled:opacity-50',
        {
          'bg-primary hover:bg-primary/90 text-primary-foreground px-6gap-2 h-10 min-w-24 rounded-md':
            variant === 'primary',
          'bg-background hover:bg-primary/20 hover:text-accent-foreground text-foreground border-border h-10 min-w-24 gap-2 rounded-md border px-6 text-sm disabled:opacity-50':
            variant === 'secondary',
          'text-typography-100 hover:bg-secondary-150 dark:hover:bg-dark-100 w-full justify-start gap-2.5 px-3 py-1.5':
            variant === 'menu',
          'text-typography-100 dark:text-secondary-100': variant === 'text',
          'bg-red disabled:bg-red-hovered hover:bg-red-hovered text-secondary-100 h-10 min-w-32 rounded-full px-16 font-semibold':
            variant === 'destructive',
          'text-red hover:bg-secondary-150 dark:hover:bg-dark-100 w-full justify-start gap-2.5 px-3 py-1.5':
            variant === 'menu-destructive',
          'w-full': fullWidth === true,
        },
        className
      )}
      {...btnProps}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
