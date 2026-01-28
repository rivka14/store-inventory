import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { inventoryItemSchema, type InventoryItemFormData } from '@/schemas/inventorySchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import type { Product } from '@/types/product';

interface InventoryFormProps {
  availableProducts: Product[];
  onSubmit: (data: InventoryItemFormData) => void;
  isLoading?: boolean;
}

export function InventoryForm({
  availableProducts,
  onSubmit,
  isLoading = false,
}: InventoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<InventoryItemFormData>({
    resolver: yupResolver(inventoryItemSchema),
    defaultValues: {
      name: '',
      quantity: 1,
    },
  });

  const selectedProduct = watch('name');

  const onSubmitHandler = (data: InventoryItemFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div className="flex gap-3 items-start">
        <div className="flex-1 space-y-1">
          <Select
            value={selectedProduct}
            onValueChange={(value) => setValue('name', value, { shouldValidate: true })}
            disabled={isLoading || availableProducts.length === 0}
          >
            <SelectTrigger className="font-mono">
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {availableProducts.map((product) => (
                <SelectItem key={product.name} value={product.name} className="font-mono">
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="w-32 space-y-1">
          <Input
            type="number"
            {...register('quantity', { valueAsNumber: true })}
            placeholder="Qty"
            disabled={isLoading}
            min={1}
            className="font-mono"
          />
          {errors.quantity && (
            <p className="text-sm text-destructive">{errors.quantity.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || availableProducts.length === 0 || !selectedProduct}
          size="icon"
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
