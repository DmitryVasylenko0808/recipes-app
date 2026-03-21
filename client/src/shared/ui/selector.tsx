import { cn } from '@/shared/lib/utils/cn';
import type { ComponentProps } from 'react';

export type Option<T> = {
  value?: T;
  label: string;
};
type SelectorProps<T> = ComponentProps<'select'> & {
  options?: Option<T>[];
};

export const Selector = <T extends string | number | readonly string[] | undefined = string>({
  options,
  className,
  ...selectProps
}: Readonly<SelectorProps<T>>) => {
  return (
    <select
      className={cn(
        'bg-input-background placeholder:text-muted-foreground focus:border-ring focus:ring-ring/50 block h-9 w-full rounded-md px-4 py-2 text-sm font-medium outline-0 duration-100 focus:ring-[3px]',
        className
      )}
      {...selectProps}
    >
      {options?.map((opt) => (
        <option key={opt.value?.toString()} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
