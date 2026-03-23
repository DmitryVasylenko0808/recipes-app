import type { ComponentProps } from 'react';
import { cn } from '../lib/utils/cn';
import { Button } from './button';
import { Portal } from './portal';

export type ModalProps = ComponentProps<'div'> & {
  open: boolean;
  onClose: () => void;
};
export const Modal = ({ open, className, children, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <Portal targetId="modals-root">
      <div className="fixed top-0 left-0 z-40 flex min-h-screen w-full items-center justify-center bg-black/50">
        <div
          className={cn(
            'bg-background max-h-200 min-w-sm overflow-y-auto rounded-lg shadow-lg',
            className
          )}
        >
          <div className="p-6">
            <div className="flex items-start justify-end">
              <Button as="button" variant="text" onClick={onClose}>
                X
              </Button>
            </div>
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
