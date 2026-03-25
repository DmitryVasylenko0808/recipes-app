import type { ReactNode } from 'react';
import { cn } from '../lib/utils/cn';

type TypograpghyProps = {
  tagVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';
  className?: string;
  children?: ReactNode;
};

export const Typograpghy = ({
  tagVariant = 'p',
  className,
  children,
}: Readonly<TypograpghyProps>) => {
  const Tag = tagVariant;

  return (
    <Tag
      className={cn(
        {
          'text-2xl': tagVariant === 'h1',
          'text-xl': tagVariant === 'h2',
          'text-lg': tagVariant === 'h3',
          'text-base': tagVariant === 'h4',
          'font-medium':
            tagVariant === 'h1' ||
            tagVariant === 'h2' ||
            tagVariant === 'h3' ||
            tagVariant === 'h4',
          'text-muted-foreground': tagVariant === 'p',
          'text-muted-foreground text-xs': tagVariant === 'span',
          'block font-medium': tagVariant === 'label',
        },
        className
      )}
    >
      {children}
    </Tag>
  );
};
