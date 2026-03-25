import type { ComponentProps } from 'react';

import { Typograpghy } from './typography';
import { cn } from '../lib/utils/cn';
import { type LucideIcon } from 'lucide-react';

type TextFieldProps = ComponentProps<'input'> & {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  caption?: string;
};

export const TextField = ({
  label,
  icon: Icon,
  error,
  caption,
  className,
  ref,
  ...textFieldProps
}: Readonly<TextFieldProps>) => {
  return (
    <div className={cn('relative', className)}>
      {label && (
        <Typograpghy tagVariant="label" className="mb-2">
          {label}
        </Typograpghy>
      )}
      <div
        className={cn(
          'bg-input-background focus-within:border-ring focus-within:ring-ring/50 flex h-9 items-center gap-2 rounded-md px-4 py-2 text-sm font-medium duration-100 focus-within:ring-[3px]',
          { 'border-destructive border': error }
        )}
      >
        {Icon && <Icon size={16} className="text-muted-foreground" />}
        <input
          className="placeholder:text-muted-foreground flex-1 outline-0"
          ref={ref}
          {...textFieldProps}
        />
      </div>

      {error ? (
        <Typograpghy tagVariant="span" className="text-destructive mt-2">
          {error}
        </Typograpghy>
      ) : (
        <Typograpghy tagVariant="span" className="mt-2">
          {caption}
        </Typograpghy>
      )}
    </div>
  );
};
