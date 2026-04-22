import { RangeDate } from '../recipes.types';

export const getMonthRange = (months: number): RangeDate => {
  const to = new Date();
  const from = new Date();

  from.setMonth(from.getMonth() - months);
  from.setHours(0, 0, 0, 0);

  return { from, to };
};
