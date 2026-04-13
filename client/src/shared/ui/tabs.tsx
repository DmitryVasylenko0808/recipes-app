import type { LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';

type TabItemProps = {
  text: string;
  active?: boolean;
  icon?: LucideIcon;
  onClick: () => void;
};
export const TabItem = ({ active, icon: Icon, text, onClick }: TabItemProps) => (
  <button
    className={cn(
      'text-foreground inline-flex min-w-40 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-2 py-1 text-sm font-medium',
      {
        'bg-card border-primary border-2': active,
      }
    )}
    onClick={onClick}
  >
    {Icon && <Icon size={16} />}
    {text}
  </button>
);

type TabsProps = ComponentProps<'div'>;
export const Tabs = ({ className, children, ...tabsProps }: TabsProps) => {
  return (
    <div
      className={cn('bg-muted inline-flex h-9 items-center rounded-xl p-0.75', className)}
      {...tabsProps}
    >
      {children}
    </div>
  );
};
