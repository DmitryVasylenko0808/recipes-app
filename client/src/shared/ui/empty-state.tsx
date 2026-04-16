import { type ReactNode } from 'react';
import { Typograpghy } from './typography';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center py-12">
      <Typograpghy tagVariant="h3" className="mb-1">
        {title}
      </Typograpghy>
      {description && (
        <Typograpghy tagVariant="p" className="mb-3">
          {description}
        </Typograpghy>
      )}
      {action}
    </div>
  );
};
