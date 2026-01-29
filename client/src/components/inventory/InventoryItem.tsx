import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import type { InventoryItem as InventoryItemType } from '@/types/inventory';

interface InventoryItemProps {
  item: InventoryItemType;
  onRemove: (name: string) => void;
  onQuantityChange: (name: string, quantity: number) => void;
}

export function InventoryItem({ item, onRemove, onQuantityChange }: InventoryItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editQuantity, setEditQuantity] = useState(item.quantity.toString());
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setEditQuantity(item.quantity.toString());
  }, [item.quantity]);

  const handleConfirm = () => {
    const newQuantity = parseInt(editQuantity, 10);
    const isValidInteger = !isNaN(newQuantity) &&
                          newQuantity > 0 &&
                          Number.isInteger(Number(editQuantity));

    if (isValidInteger) {
      onQuantityChange(item.name, newQuantity);
      setIsEditing(false);
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 500);
    }
  };

  const handleCancel = () => {
    setEditQuantity(item.quantity.toString());
    setIsEditing(false);
    setIsInvalid(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="group flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-200">
      <div className="flex items-center gap-4 flex-1">
        <span className="font-mono font-medium">{item.name}</span>
        <span className="text-sm text-muted-foreground">×</span>
        {isEditing ? (
          <Input
            type="number"
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`min-w-20 h-8 font-mono text-primary font-semibold ${
              isInvalid ? 'border-destructive animate-shake' : ''
            }`}
            min="1"
            step="1"
            autoFocus
            aria-label="Edit quantity"
          />
        ) : (
          <span className="font-mono text-primary font-semibold">{item.quantity}</span>
        )}
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleConfirm}
              className="h-8 w-8 hover:text-stock hover:bg-stock/10"
              aria-label="Confirm quantity change"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-8 w-8 hover:text-destructive hover:bg-destructive/10"
              aria-label="Cancel editing"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8"
              aria-label="Edit quantity"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.name)}
              className="h-8 w-8 hover:text-destructive hover:bg-destructive/10"
              aria-label={`Remove ${item.name} from inventory`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
