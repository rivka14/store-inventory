import { Skeleton } from '@/components/ui/skeleton';
import { InventoryItem } from './InventoryItem';
import type { InventoryItem as InventoryItemType } from '@/types/inventory';
import { ClipboardList } from 'lucide-react';

interface InventoryListProps {
  items: InventoryItemType[];
  onRemove: (name: string) => void;
  isLoading?: boolean;
}

export function InventoryList({ items, onRemove, isLoading = false }: InventoryListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-muted-foreground">No items in inventory</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add products from the dropdown above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <InventoryItem key={item.name} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}
