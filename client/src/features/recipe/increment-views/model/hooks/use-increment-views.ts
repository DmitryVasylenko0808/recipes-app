import { useMutation } from '@tanstack/react-query';
import { patchIncrementViews } from '../../api';
import { useEffect } from 'react';

export const useIncrementViews = (id?: string) => {
  const { mutate } = useMutation({ mutationFn: patchIncrementViews });

  useEffect(() => {
    if (id) mutate(id);
  }, [id]);
};
