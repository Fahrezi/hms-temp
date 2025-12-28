import { useEffect,useState } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogFooter,DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/TextArea";

import { LostFoundCategory, LostFoundItem, LostFoundStatus,LostFoundType } from "@/types/hotel";

interface LostFoundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: LostFoundItem | null;
  mode: 'add' | 'edit' | 'view';
  onSave: (item: Partial<LostFoundItem>) => void;
}

const categories: { value: LostFoundCategory; label: string }[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'documents', label: 'Documents' },
  { value: 'bags', label: 'Bags' },
  { value: 'keys', label: 'Keys' },
  { value: 'other', label: 'Other' },
];

const statuses: { value: LostFoundStatus; label: string }[] = [
  { value: 'reported', label: 'Reported' },
  { value: 'found', label: 'Found' },
  { value: 'matched', label: 'Matched' },
  { value: 'returned', label: 'Returned' },
  { value: 'disposed', label: 'Disposed' },
];

export function LostFoundDialog({ open, onOpenChange, item, mode, onSave }: LostFoundDialogProps) {
  const [formData, setFormData] = useState<Partial<LostFoundItem>>({
    type: 'lost',
    status: 'reported',
    category: 'other',
    itemName: '',
    description: '',
    location: '',
    reportedBy: '',
    roomNumber: '',
    contactInfo: '',
    storageLocation: '',
    notes: '',
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        type: 'lost',
        status: 'reported',
        category: 'other',
        itemName: '',
        description: '',
        location: '',
        reportedBy: '',
        roomNumber: '',
        contactInfo: '',
        storageLocation: '',
        notes: '',
      });
    }
  }, [item, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const isViewMode = mode === 'view';
  const title = mode === 'add' ? 'Report Item' : mode === 'edit' ? 'Edit Item' : 'Item Details';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isViewMode && mode === 'add' && (
            <div className="space-y-2">
              <Label>Item Type</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) => setFormData({ 
                  ...formData, 
                  type: value as LostFoundType,
                  status: value === 'lost' ? 'reported' : 'found'
                })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lost" id="lost" />
                  <Label htmlFor="lost" className="cursor-pointer">Lost (Guest Report)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="found" id="found" />
                  <Label htmlFor="found" className="cursor-pointer">Found (Staff Report)</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                disabled={isViewMode}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as LostFoundCategory })}
                disabled={isViewMode}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isViewMode}
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={isViewMode}
                placeholder="e.g., Lobby, Restaurant"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                value={formData.roomNumber || ''}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                disabled={isViewMode}
                placeholder="e.g., 101"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportedBy">Reported By *</Label>
              <Input
                id="reportedBy"
                value={formData.reportedBy}
                onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                disabled={isViewMode}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactInfo">Contact Info</Label>
              <Input
                id="contactInfo"
                value={formData.contactInfo || ''}
                onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                disabled={isViewMode}
                placeholder="Phone or email"
              />
            </div>
          </div>

          {formData.type === 'found' && (
            <div className="space-y-2">
              <Label htmlFor="storageLocation">Storage Location</Label>
              <Input
                id="storageLocation"
                value={formData.storageLocation || ''}
                onChange={(e) => setFormData({ ...formData, storageLocation: e.target.value })}
                disabled={isViewMode}
                placeholder="Where the item is stored"
              />
            </div>
          )}

          {mode === 'edit' && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as LostFoundStatus })}
                disabled={isViewMode}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              name="notes"
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              disabled={isViewMode}
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {isViewMode ? 'Close' : 'Cancel'}
            </Button>
            {!isViewMode && (
              <Button type="submit">
                {mode === 'add' ? 'Add Item' : 'Save Changes'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}