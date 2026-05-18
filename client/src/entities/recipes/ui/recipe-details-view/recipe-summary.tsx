import { Typograpghy } from '@/shared';
import type { ReactNode } from 'react';

type RecipeSummaryProps = {
  title: string;
  description: string;
  actionsSlot?: ReactNode;
};
export const RecipeSummary = ({ title, description, actionsSlot }: RecipeSummaryProps) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Typograpghy tagVariant="h1">{title}</Typograpghy>
        {actionsSlot}
      </div>
      <Typograpghy tagVariant="p">{description}</Typograpghy>
    </div>
  );
};
