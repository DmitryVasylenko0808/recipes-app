import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';
import { Link, type LinkProps } from 'react-router';
import { Loader } from './loader';

export type BaseButtonProps = {
  variant: 'primary' | 'secondary' | 'text' | 'destructive' | 'file';
  fullWidth?: true;
};

type LinkButtonProps = BaseButtonProps & LinkProps & { as: 'link' };
type DefaultButtonProps = BaseButtonProps &
  ComponentProps<'button'> & { as: 'button'; isLoading?: boolean };

type ButtonProps = LinkButtonProps | DefaultButtonProps;

export const Button = ({
  variant = 'primary',
  fullWidth,
  className,
  children,
  ...btnProps
}: Readonly<ButtonProps>) => {
  const classes = cn(
    'inline-flex cursor-pointer items-center font-medium duration-100 px-6 h-10 disabled:opacity-50 gap-2 rounded-md',
    {
      'bg-primary hover:bg-primary/90 text-primary-foreground min-w-24 rounded-md justify-center':
        variant === 'primary',
      'bg-background hover:bg-primary/20 hover:text-accent-foreground text-foreground border-border justify-center  min-w-24 rounded-md border  text-sm disabled:opacity-50':
        variant === 'secondary',
      'hover:bg-accent': variant === 'text',
      'bg-red disabled:bg-red-hovered hover:bg-red-hovered text-secondary-100  min-w-32 rounded-full  font-semibold':
        variant === 'destructive',
      'bg-input-background block h-9 cursor-pointer rounded-md px-4 py-2 duration-100 hover:bg-accent hover:text-accent-foreground':
        variant === 'file',
      'w-full': fullWidth === true,
    },
    className
  );

  if (btnProps.as === 'button') {
    const { isLoading } = btnProps;

    return (
      <button className={classes} {...btnProps}>
        {isLoading ? <Loader variant="secondary" size="sm" /> : children}
      </button>
    );
  }

  return (
    <Link className={classes} {...btnProps}>
      {children}
    </Link>
  );
};
