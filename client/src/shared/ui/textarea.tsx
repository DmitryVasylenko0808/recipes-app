import type { ComponentProps } from 'react';

import { Typograpghy } from './typography';
import { cn } from '../lib/utils/cn';

type TextAreaProps = ComponentProps<'textarea'> & {
  label?: string;
  error?: string;
  caption?: string;
};

export const TextArea = ({
  label,
  error,
  caption,
  className,
  ref,
  ...textFieldProps
}: Readonly<TextAreaProps>) => {
  return (
    <div className={cn('relative w-full', className)}>
      {label && (
        <Typograpghy tagVariant="label" className="mb-2">
          {label}
        </Typograpghy>
      )}
      <textarea
        className={cn(
          'bg-input-background placeholder:text-muted-foreground focus:border-ring focus:ring-ring/50 block min-h-9 w-full rounded-md px-4 py-2 text-sm font-medium outline-0 duration-100 focus:ring-[3px]',
          {
            'border-destructive border': error,
          }
        )}
        ref={ref}
        {...textFieldProps}
      />
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
