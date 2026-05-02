import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';
import { Link, type LinkProps } from 'react-router';
import { Loader } from './loader';
import type { LucideIcon } from 'lucide-react';

export type BaseButtonProps = {
  variant: 'primary' | 'secondary' | 'text' | 'destructive' | 'file';
  icon?: LucideIcon;
  size?: 'sm' | 'lg';
  fullWidth?: true;
};

type LinkButtonProps = BaseButtonProps & LinkProps & { as: 'link' };
type DefaultButtonProps = BaseButtonProps &
  ComponentProps<'button'> & { as: 'button'; isLoading?: boolean };

type ButtonProps = LinkButtonProps | DefaultButtonProps;

export const Button = ({
  variant = 'primary',
  icon: Icon,
  fullWidth,
  size = 'lg',
  className,
  children,
  ...btnProps
}: Readonly<ButtonProps>) => {
  const classes = cn(
    'inline-flex cursor-pointer items-center font-medium duration-100  disabled:opacity-50 gap-2 rounded-md',
    {
      'bg-primary hover:bg-primary/90 text-primary-foreground rounded-md justify-center':
        variant === 'primary',
      'bg-background hover:bg-primary/20 hover:text-accent-foreground text-foreground border-border justify-center rounded-md border  text-sm disabled:opacity-50':
        variant === 'secondary',
      'hover:bg-accent': variant === 'text',
      'bg-red disabled:bg-red-hovered hover:bg-red-hovered text-secondary-100 rounded-full font-semibold':
        variant === 'destructive',
      'bg-input-background block h-9 cursor-pointer rounded-md px-4 py-2 duration-100 hover:bg-accent hover:text-accent-foreground':
        variant === 'file',
      'w-full': fullWidth === true,
      'min-w-24 px-6 h-10': size === 'lg',
      'min-w-10 px-2.5 h-8 text-xs': size === 'sm',
    },
    className
  );

  const btnIcon = Icon && (
    <Icon size={16} className={cn({ 'fill-white text-white': variant === 'primary' })} />
  );

  if (btnProps.as === 'button') {
    const { isLoading } = btnProps;

    return (
      <button className={classes} {...btnProps}>
        {btnIcon}
        {isLoading ? <Loader variant="secondary" size="sm" /> : children}
      </button>
    );
  }

  return (
    <Link className={classes} {...btnProps}>
      {btnIcon}
      {children}
    </Link>
  );
};

export const IconButton = ({
  variant = 'primary',
  icon: Icon,
  fullWidth,
  className,
  children,
  ...btnProps
}: Readonly<ButtonProps>) => {
  const classes = cn(
    'inline-flex cursor-pointer items-center justify-center font-medium duration-100 w-10 h-10 disabled:opacity-50 rounded-md',
    {
      'bg-primary hover:bg-primary/90 text-primary-foreground  rounded-md justify-center':
        variant === 'primary',
      'bg-background hover:bg-primary/20 hover:text-accent-foreground text-foreground border-border justify-center rounded-md border text-sm disabled:opacity-50':
        variant === 'secondary',
      'hover:bg-accent': variant === 'text',
      'text-destructive disabled:text-destructive/70 hover:bg-destructive/10 font-semibold':
        variant === 'destructive',
      'w-full': fullWidth === true,
    },
    className
  );

  const btnIcon = Icon && (
    <Icon size={16} className={cn({ 'fill-white text-white': variant === 'primary' })} />
  );

  if (btnProps.as === 'button') {
    const { isLoading } = btnProps;

    return (
      <button className={classes} {...btnProps}>
        {btnIcon}
        {isLoading ? <Loader variant="secondary" size="sm" /> : children}
      </button>
    );
  }

  return (
    <Link className={classes} {...btnProps}>
      {btnIcon}
      {children}
    </Link>
  );
};
