import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ProductForm } from '@/components/products/ProductForm';
import { ProductList } from '@/components/products/ProductList';
import { ProductDeleteDialog } from '@/components/products/ProductDeleteDialog';
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '@/hooks/useProducts';
import { useInventory } from '@/hooks/useInventory';
import { useToast } from '@/hooks/use-toast';

export function ProductsPage() {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: inventory = [] } = useInventory();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const inventoryProductNames = inventory.map(item => item.name);

  const handleCreate = (data: { name: string }) => {
    createProduct.mutate(data.name, {
      onSuccess: () => {
        toast({
          title: 'Product created',
          description: `${data.name} has been added successfully.`,
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

  const handleUpdate = (oldName: string, newName: string) => {
    updateProduct.mutate(
      { oldName, newName },
      {
        onSuccess: () => {
          toast({
            title: 'Product updated',
            description: `Product renamed to ${newName}.`,
          });
        },
        onError: (error: Error) => {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
        },
      }
    );
  };

  const handleDeleteClick = (name: string) => {
    setProductToDelete(name);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!productToDelete) return;

    deleteProduct.mutate(productToDelete, {
      onSuccess: () => {
        toast({
          title: 'Product deleted',
          description: `${productToDelete} has been removed.`,
        });
        setDeleteDialogOpen(false);
        setProductToDelete(null);
      },
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        setDeleteDialogOpen(false);
        setProductToDelete(null);
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Products</h2>
        <p className="text-muted-foreground">
          Manage your product catalog
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Add New Product
          </h3>
          <ProductForm
            onSubmit={handleCreate}
            isLoading={createProduct.isPending}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            All Products ({products.length})
          </h3>
          <ProductList
            products={products}
            inventoryProductNames={inventoryProductNames}
            onUpdate={handleUpdate}
            onDelete={handleDeleteClick}
            isLoading={productsLoading}
            updatingProduct={
              updateProduct.isPending && updateProduct.variables?.oldName
                ? updateProduct.variables.oldName
                : undefined
            }
            deletingProduct={
              deleteProduct.isPending && deleteProduct.variables
                ? deleteProduct.variables
                : undefined
            }
          />
        </Card>
      </div>

      {productToDelete && (
        <ProductDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          productName={productToDelete}
          isLoading={deleteProduct.isPending}
        />
      )}
    </div>
  );
}
