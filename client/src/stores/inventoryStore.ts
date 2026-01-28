import { create } from 'zustand';
import type { InventoryItem } from '@/types/inventory';

interface InventoryStore {
  items: InventoryItem[];
  isDirty: boolean;
  addItem: (item: InventoryItem) => void;
  removeItem: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  setItems: (items: InventoryItem[]) => void;
  reset: () => void;
}

export const useInventoryStore = create<InventoryStore>((set) => ({
  items: [],
  isDirty: false,

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
      isDirty: true,
    })),

  removeItem: (name) =>
    set((state) => ({
      items: state.items.filter((item) => item.name !== name),
      isDirty: true,
    })),

  updateQuantity: (name, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.name === name ? { ...item, quantity } : item
      ),
      isDirty: true,
    })),

  setItems: (items) =>
    set({
      items,
      isDirty: false,
    }),

  reset: () =>
    set({
      items: [],
      isDirty: false,
    }),
}));
