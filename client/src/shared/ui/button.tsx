import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';
import { Link, type LinkProps } from 'react-router';

export type BaseButtonProps = {
  variant: 'primary' | 'secondary' | 'menu' | 'text' | 'destructive' | 'menu-destructive';
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
    'inline-flex cursor-pointer items-center justify-center font-medium duration-100 disabled:opacity-50',
    {
      'bg-primary hover:bg-primary/90 text-primary-foreground px-6 gap-2 h-10 min-w-24 rounded-md':
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
  );

  if (btnProps.as === 'button') {
    const { isLoading } = btnProps;

    return (
      <button className={classes} {...btnProps} disabled={isLoading}>
        {isLoading ? 'Loading...' : children}
      </button>
    );
  }

  return (
    <Link className={classes} {...btnProps}>
      {children}
    </Link>
  );
};

// import React from "react";

// // Define a discriminated union for props
// type ButtonProps =
//   | { variant: "link"; href: string; onClick?: never }
//   | { variant: "button"; onClick: () => void; href?: never };

// const MyButton: React.FC<ButtonProps> = (props) => {
//   // Type narrowing using the discriminant `variant`
//   if (props.variant === "link") {
//     // Here, props is { variant: "link"; href: string }
//     return <a href={props.href}>{props.href}</a>;
//   } else {
//     // Here, props is { variant: "button"; onClick: () => void }
//     return <button onClick={props.onClick}>Click me</button>;
//   }
// };

// export default function App() {
//   return (
//     <>
//       <MyButton variant="link" href="https://example.com" />
//       <MyButton variant="button" onClick={() => alert("Clicked!")} />
//     </>
//   );
// }
