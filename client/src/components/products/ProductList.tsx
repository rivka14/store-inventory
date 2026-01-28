import { Skeleton } from '@/components/ui/skeleton';
import { ProductItem } from './ProductItem';
import type { Product } from '@/types/product';
import { Package } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  inventoryProductNames: string[];
  onUpdate: (oldName: string, newName: string) => void;
  onDelete: (name: string) => void;
  isLoading?: boolean;
  updatingProduct?: string;
  deletingProduct?: string;
}

export function ProductList({
  products,
  inventoryProductNames,
  onUpdate,
  onDelete,
  isLoading = false,
  updatingProduct,
  deletingProduct,
}: ProductListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-muted-foreground">No products yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add your first product above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map(product => (
        <ProductItem
          key={product.name}
          product={product}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isInInventory={inventoryProductNames.includes(product.name)}
          isUpdating={updatingProduct === product.name}
          isDeleting={deletingProduct === product.name}
        />
      ))}
    </div>
  );
}
