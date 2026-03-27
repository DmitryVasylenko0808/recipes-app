import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';

type AvatarFallbackProps = {
  firstname: string;
  secondname: string;
} & Omit<ComponentProps<'div'>, 'children'>;

export const AvatarFallback = ({
  firstname,
  secondname,
  className,
  ...divProps
}: AvatarFallbackProps) => (
  <div
    className={cn(
      'text-primary-foreground bg-secondary-foreground inline-flex h-10 w-10 items-center justify-center rounded-full font-medium',
      className
    )}
    {...divProps}
  >
    {firstname.at(0)?.toUpperCase()} {secondname.at(0)?.toUpperCase()}
  </div>
);
