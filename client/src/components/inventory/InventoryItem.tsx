import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { InventoryItem as InventoryItemType } from '@/types/inventory';

interface InventoryItemProps {
  item: InventoryItemType;
  onRemove: (name: string) => void;
}

export function InventoryItem({ item, onRemove }: InventoryItemProps) {
  return (
    <div className="group flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-200">
      <div className="flex items-center gap-4 flex-1">
        <span className="font-mono font-medium">{item.name}</span>
        <span className="text-sm text-muted-foreground">×</span>
        <span className="font-mono text-primary font-semibold">{item.quantity}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(item.name)}
        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
