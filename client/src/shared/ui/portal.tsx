import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = PropsWithChildren & { targetId: string };
export const Portal = ({ targetId, children }: PortalProps) => {
  return createPortal(children, document.querySelector(`#${targetId}`) as Element);
};
