import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { InventoryItem } from '@/types/inventory';

export function useInventory() {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data } = await api.get<InventoryItem[]>('/inventory');
      return data;
    },
  });
}

export function useSaveInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: InventoryItem[]) => {
      const { data } = await api.post<InventoryItem[]>('/inventory', items);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
}

export function useResetInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post<InventoryItem[]>('/inventory/reset');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
}
