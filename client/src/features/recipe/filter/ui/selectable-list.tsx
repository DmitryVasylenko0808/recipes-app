import { Badge, Collapsible, Typograpghy } from '@/shared';
import type { ReactNode } from 'react';

type BaseSelectableListProps<T> = {
  title: string;
  avialableItems: T[];
  selectedItems: T[];
  renderItem: (item: T) => ReactNode;
  onSelectItem?: (item: T | null) => void;
};
type DefaultSelectableListProps<T> = BaseSelectableListProps<T> & { type: 'default' };
type CollapsibleSelectableListProps<T> = BaseSelectableListProps<T> & {
  type: 'collapsible';
  initialPreviewCount: number;
};
type SelectableListProps<T> = DefaultSelectableListProps<T> | CollapsibleSelectableListProps<T>;

export const SelectableList = <T extends any>({
  title,
  avialableItems,
  selectedItems,
  renderItem,
  onSelectItem,
  ...props
}: SelectableListProps<T>) => {
  const items = avialableItems.map(renderItem);

  if (props.type === 'collapsible') {
    return (
      <Collapsible
        className="mb-6"
        preview={
          <div>
            <Typograpghy tagVariant="label" className="mb-3">
              {title}
            </Typograpghy>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedItems.length ? 'terciary' : 'primary'}
                className="cursor-pointer"
                onClick={() => onSelectItem?.(null)}
              >
                All
              </Badge>
              {items.slice(0, props.initialPreviewCount)}
            </div>
          </div>
        }
        full={
          <div className="mt-2 flex flex-wrap gap-2">{items.slice(props.initialPreviewCount)}</div>
        }
      />
    );
  }

  return (
    <div className="mb-6">
      <Typograpghy tagVariant="label" className="mb-3">
        {title}
      </Typograpghy>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedItems.length ? 'terciary' : 'primary'}
          className="cursor-pointer"
          onClick={() => onSelectItem?.(null)}
        >
          All
        </Badge>
        {items}
      </div>
    </div>
  );
};
