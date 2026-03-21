import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';

type MenuProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  open: boolean;
};

export const Menu = ({ trigger, content, open }: Readonly<MenuProps>) => {
  return (
    <div className="relative">
      {trigger}
      {open && <>{content}</>}
    </div>
  );
};

type MenuContentProps = ComponentProps<'div'>;
export const MenuContent = ({ className, children, ref, ...divProps }: MenuContentProps) => (
  <div
    className={cn(
      'bg-card border-ring/30 text-card-foreground absolute top-full right-0 z-30 my-1 w-full min-w-32 overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
      className
    )}
    ref={ref}
    {...divProps}
  >
    {children}
  </div>
);

type MenuSectionProps = ComponentProps<'div'>;
export const MenuSection = ({ className, children, ...divProps }: MenuSectionProps) => (
  <div className={cn('p-1', className)} {...divProps}>
    {children}
  </div>
);

type MenuItemProps = ComponentProps<'button'> & { variant?: 'default' | 'desctructive' };
export const MenuItem = ({ variant = 'default', children, ...btnProps }: MenuItemProps) => (
  <button
    className={cn(
      'hover:text-accent-foreground hover:bg-accent flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
      {
        'text-popover-foreground': variant === 'default',
        'text-destructive': variant === 'desctructive',
      }
    )}
    {...btnProps}
  >
    {children}
  </button>
);

export const MenuDivider = () => <div className="bg-border my-0.5 h-px"></div>;
