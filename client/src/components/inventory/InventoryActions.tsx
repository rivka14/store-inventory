import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Save, RotateCcw, AlertCircle } from 'lucide-react';

interface InventoryActionsProps {
  onSave: () => void;
  onReset: () => void;
  isSaving?: boolean;
  isResetting?: boolean;
  hasChanges: boolean;
  itemCount: number;
}

export function InventoryActions({
  onSave,
  onReset,
  isSaving = false,
  isResetting = false,
  hasChanges,
  itemCount,
}: InventoryActionsProps) {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const handleResetConfirm = () => {
    onReset();
    setResetDialogOpen(false);
  };

  return (
    <>
      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={() => setResetDialogOpen(true)}
          disabled={isSaving || isResetting || itemCount === 0}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          {isResetting ? 'Resetting...' : 'Reset All'}
        </Button>
        <Button
          onClick={onSave}
          disabled={isSaving || isResetting || !hasChanges}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Inventory'}
        </Button>
      </div>

      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Reset Inventory
            </DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to reset the entire inventory? This will remove all{' '}
              <span className="font-semibold text-foreground">{itemCount}</span>{' '}
              {itemCount === 1 ? 'item' : 'items'} from your inventory. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setResetDialogOpen(false)}
              disabled={isResetting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleResetConfirm}
              disabled={isResetting}
            >
              {isResetting ? 'Resetting...' : 'Reset All'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
