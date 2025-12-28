import { useEffect,useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/TextArea";

import { Guest, GuestStatus } from "@/types/hotel";

interface GuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guest?: Guest | null;
  onSave: (guest: Partial<Guest>) => void;
}

const guestStatuses: GuestStatus[] = ['checked-in', 'checked-out', 'reserved'];

export function GuestDialog({ open, onOpenChange, guest, onSave }: GuestDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    status: 'reserved' as GuestStatus,
    notes: '',
  });

  useEffect(() => {
    if (guest) {
      setFormData({
        name: guest.name,
        email: guest.email,
        phone: guest.phone,
        idNumber: guest.idNumber,
        status: guest.status,
        notes: guest.notes || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        idNumber: '',
        status: 'reserved',
        notes: '',
      });
    }
  }, [guest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ 
      ...formData, 
      id: guest?.id,
      createdAt: guest?.createdAt || new Date().toISOString().split('T')[0]
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{guest ? 'Edit Guest' : 'Add New Guest'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Smith"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 555-0100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                placeholder="P12345678"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: GuestStatus) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {guestStatuses.map((status) => (
                    <SelectItem key={status} value={status} className="capitalize">
                      {status.replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              name="notes"
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Special preferences or requests..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {guest ? 'Save Changes' : 'Add Guest'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
