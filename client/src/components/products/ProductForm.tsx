import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema, type ProductFormData } from '@/schemas/productSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Check, X } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel?: () => void;
  defaultValue?: string;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

export function ProductForm({
  onSubmit,
  onCancel,
  defaultValue = '',
  isLoading = false,
  mode = 'create',
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: { name: defaultValue },
  });

  const onSubmitHandler = (data: ProductFormData) => {
    onSubmit(data);
    if (mode === 'create') {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="flex gap-2 items-start">
      <div className="flex-1">
        <Input
          {...register('name')}
          placeholder="Product name"
          disabled={isLoading}
          className="font-mono"
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading} size="icon" className="shrink-0">
          {mode === 'create' ? (
            <Plus className="h-4 w-4" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
        {mode === 'edit' && onCancel && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onCancel}
            disabled={isLoading}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
