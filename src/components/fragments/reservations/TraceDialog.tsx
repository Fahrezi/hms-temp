import { Bell, Package, Palmtree } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

import { Trace, TraceType } from "@/types/hotel";

interface TraceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (trace: Omit<Trace, 'id' | 'createdAt' | 'status'>) => void;
  defaultType?: TraceType;
}

const typeOptions: { value: TraceType; label: string; icon: React.ReactNode }[] = [
  { value: 'reminder', label: 'Reminder', icon: <Bell className="h-4 w-4" /> },
  { value: 'inventory-request', label: 'Inventory Request', icon: <Package className="h-4 w-4" /> },
  { value: 'leisure-booking', label: 'Leisure Booking', icon: <Palmtree className="h-4 w-4" /> },
];

const assignmentOptions = [
  'Front Desk',
  'Housekeeping',
  'Concierge',
  'Room Service',
  'Maintenance',
  'Spa',
  'Restaurant',
  'Management',
];

export function TraceDialog({ open, onOpenChange, onSave, defaultType }: TraceDialogProps) {
  const [type, setType] = useState<TraceType>(defaultType || 'reminder');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  
  // Inventory Request fields
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [deliveryTime, setDeliveryTime] = useState('');
  
  // Leisure Booking fields
  const [activityName, setActivityName] = useState('');
  const [venue, setVenue] = useState('');
  const [pax, setPax] = useState(1);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const resetForm = () => {
    setType(defaultType || 'reminder');
    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
    setAssignedTo('');
    setItemName('');
    setQuantity(1);
    setDeliveryTime('');
    setActivityName('');
    setVenue('');
    setPax(1);
    setConfirmationNumber('');
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const trace: Omit<Trace, 'id' | 'createdAt' | 'status'> = {
      type,
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      dueTime: dueTime || undefined,
      assignedTo: assignedTo || undefined,
    };

    if (type === 'inventory-request') {
      trace.itemName = itemName || undefined;
      trace.quantity = quantity;
      trace.deliveryTime = deliveryTime || undefined;
    }

    if (type === 'leisure-booking') {
      trace.activityName = activityName || undefined;
      trace.venue = venue || undefined;
      trace.pax = pax;
      trace.confirmationNumber = confirmationNumber || undefined;
    }

    onSave(trace);
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Trace</DialogTitle>
          <DialogDescription>
            Create a new trace for this reservation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as TraceType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className="flex items-center gap-2">
                      {opt.icon}
                      <span>{opt.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Title *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                type === 'reminder' ? 'e.g., Call guest to confirm' :
                type === 'inventory-request' ? 'e.g., Extra pillows' :
                'e.g., Spa appointment'
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional details..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Due Time</Label>
              <Input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Assigned To</Label>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {assignmentOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Inventory Request specific fields */}
          {type === 'inventory-request' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Item Name</Label>
                  <Input
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="e.g., Pillows"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Delivery Time</Label>
                <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="before-arrival">Before Arrival</SelectItem>
                    <SelectItem value="at-check-in">At Check-in</SelectItem>
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="specific-time">Specific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Leisure Booking specific fields */}
          {type === 'leisure-booking' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Activity Name</Label>
                  <Input
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                    placeholder="e.g., Aromatherapy Massage"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Venue</Label>
                  <Input
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g., Spa Center"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Pax</Label>
                  <Input
                    type="number"
                    min={1}
                    value={pax}
                    onChange={(e) => setPax(parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Confirmation #</Label>
                  <Input
                    value={confirmationNumber}
                    onChange={(e) => setConfirmationNumber(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} type="button" disabled={!title.trim()}>
            Add Trace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
