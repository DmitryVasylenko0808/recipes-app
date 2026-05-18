import type { ReactNode } from 'react';

type RecipeDetailsViewProps = { children: ReactNode };

export const RecipeDetailsView = ({ children }: RecipeDetailsViewProps) => {
  return <div className="space-y-6">{children}</div>;
};
