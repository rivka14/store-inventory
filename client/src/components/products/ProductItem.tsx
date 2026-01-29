import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Package } from 'lucide-react';
import { ProductForm } from './ProductForm';
import type { Product } from '@/types/product';

interface ProductItemProps {
  product: Product;
  onUpdate: (oldName: string, newName: string) => void;
  onDelete: (name: string) => void;
  isInInventory: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function ProductItem({
  product,
  onUpdate,
  onDelete,
  isInInventory,
  isUpdating = false,
  isDeleting = false,
}: ProductItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (data: { name: string }) => {
    onUpdate(product.name, data.name);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-card border border-border rounded-lg">
        <ProductForm
          mode="edit"
          defaultValue={product.name}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isLoading={isUpdating}
        />
      </div>
    );
  }

  return (
    <div className="group p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Package
              className={`h-4 w-4 shrink-0 ${
                isInInventory ? 'text-stock' : 'text-accent'
              }`}
            />
            <span className="font-mono font-medium truncate">{product.name}</span>
          </div>
          {isInInventory ? (
            <span className="text-xs bg-stock/10 text-stock px-2 py-0.5 rounded font-medium">
              In Stock
            </span>
          ) : (
            <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded font-medium">
              Not in Stock
            </span>
          )}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            disabled={isUpdating || isDeleting}
            className="h-8 w-8"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(product.name)}
            disabled={isInInventory || isUpdating || isDeleting}
            className="h-8 w-8 hover:text-destructive hover:bg-destructive/10"
            title={isInInventory ? 'Cannot delete product in inventory' : 'Delete product'}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
