import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InventoryForm } from '@/components/inventory/InventoryForm';
import { InventoryList } from '@/components/inventory/InventoryList';
import { InventoryActions } from '@/components/inventory/InventoryActions';
import { useProducts } from '@/hooks/useProducts';
import {
  useInventory,
  useSaveInventory,
  useResetInventory,
} from '@/hooks/useInventory';
import { useInventoryStore } from '@/stores/inventoryStore';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Package } from 'lucide-react';
import type { InventoryItemFormData } from '@/schemas/inventorySchema';

export function InventoryPage() {
  const { toast } = useToast();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: serverInventory = [], isLoading: inventoryLoading } = useInventory();
  const saveInventory = useSaveInventory();
  const resetInventory = useResetInventory();

  const { items, isDirty, addItem, removeItem, setItems, reset } = useInventoryStore();

  useEffect(() => {
    if (serverInventory) {
      setItems(serverInventory);
    }
  }, [serverInventory, setItems]);

  const availableProducts = products.filter(
    (product) => !items.some((item) => item.name === product.name)
  );

  const handleAddItem = (data: InventoryItemFormData) => {
    addItem({ name: data.name, quantity: data.quantity });
  };

  const handleSave = () => {
    saveInventory.mutate(items, {
      onSuccess: () => {
        toast({
          title: 'Inventory saved',
          description: `${items.length} ${items.length === 1 ? 'item' : 'items'} saved successfully.`,
        });
      },
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      },
    });
  };

  const handleReset = () => {
    resetInventory.mutate(undefined, {
      onSuccess: () => {
        reset();
        toast({
          title: 'Inventory reset',
          description: 'All items have been removed from inventory.',
        });
      },
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      },
    });
  };

  if (productsLoading || inventoryLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Inventory</h2>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Inventory</h2>
          <p className="text-muted-foreground">Manage your stock levels</p>
        </div>

        <Card className="p-12 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No products available</h3>
          <p className="text-muted-foreground mb-6">
            You need to create products before you can manage inventory
          </p>
          <Link to="/products">
            <Button>
              Go to Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Inventory</h2>
        <p className="text-muted-foreground">
          Manage your stock levels
          {isDirty && (
            <span className="ml-2 text-accent font-medium">• Unsaved changes</span>
          )}
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Add to Inventory
          </h3>
          {availableProducts.length === 0 && items.length > 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p>All products have been added to inventory</p>
              <Link to="/products" className="text-primary hover:underline text-sm mt-2 inline-block">
                Create more products →
              </Link>
            </div>
          ) : (
            <InventoryForm
              availableProducts={availableProducts}
              onSubmit={handleAddItem}
            />
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Current Stock ({items.length})
            </h3>
          </div>
          <InventoryList items={items} onRemove={removeItem} />
        </Card>

        {items.length > 0 && (
          <InventoryActions
            onSave={handleSave}
            onReset={handleReset}
            isSaving={saveInventory.isPending}
            isResetting={resetInventory.isPending}
            hasChanges={isDirty}
            itemCount={items.length}
          />
        )}
      </div>
    </div>
  );
}
