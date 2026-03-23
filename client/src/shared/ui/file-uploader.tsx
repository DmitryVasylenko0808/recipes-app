import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';
import { Typograpghy } from './typography';

type FileUploaderProps = ComponentProps<'input'> & {
  label?: string;
  error?: string;
  caption?: string;
};

export const FileUploader = ({
  label,
  error,
  caption,
  className,
  ref,
  ...inputProps
}: FileUploaderProps) => {
  return (
    <div className={cn('relative w-full', className)}>
      <label className="mb-2 block font-medium">Avatar</label>
      <input
        type="file"
        className="focus:border-ring focus:ring-ring/50 bg-input-background block h-9 w-full cursor-pointer rounded-md px-4 py-2 text-sm font-medium outline-0 duration-100 file:hidden focus:ring-[3px]"
        ref={ref}
        {...inputProps}
      />
      {error ? (
        <Typograpghy tagVariant="span" className="text-destructive mt-2 text-xs">
          {error}
        </Typograpghy>
      ) : (
        <Typograpghy tagVariant="span" className="text-muted-foreground mt-2 text-xs">
          {caption}
        </Typograpghy>
      )}
    </div>
  );
};
