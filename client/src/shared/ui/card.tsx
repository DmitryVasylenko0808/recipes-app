import type { ComponentProps } from 'react';

type CardProps = Omit<ComponentProps<'div'>, 'className'>;

export const Card = ({ children, ...divProps }: CardProps) => {
  return (
    <div
      className="bg-card border-ring/30 text-card-foreground rounded-xl border shadow-xl"
      {...divProps}
    >
      {children}
    </div>
  );
};
