import { useState, useRef } from 'react';
import { useClickOutside } from './use-click-outside';

export const useToggleMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const handleToggle = () => setOpen((prev) => !prev);

  return { open, ref, handleToggle };
};
