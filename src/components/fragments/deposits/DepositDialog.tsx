import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/TextArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { 
  DollarSign, 
  Banknote, 
  CreditCard, 
  Building, 
  Wallet,
  Receipt,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Deposit, PaymentMethod, DepositStatus, Booking, Guest } from '@/types/hotel';
import { toast } from 'sonner';

const paymentMethodConfig: Record<PaymentMethod, { label: string; icon: React.ElementType }> = {
  cash: { label: 'Cash', icon: Banknote },
  'credit-card': { label: 'Credit Card', icon: CreditCard },
  'debit-card': { label: 'Debit Card', icon: CreditCard },
  'bank-transfer': { label: 'Bank Transfer', icon: Building },
  online: { label: 'Online', icon: Wallet },
};

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookings: Booking[];
  guests: Guest[];
  preSelectedBookingId?: string;
  suggestedAmount?: number;
  onDepositCreated: (deposit: Deposit) => void;
  // Context mode props - when used from reservation form
  contextMode?: boolean;
  contextGuestName?: string;
  contextRoomInfo?: string;
  contextGuestId?: string;
}

export function DepositDialog({
  open,
  onOpenChange,
  bookings,
  guests,
  preSelectedBookingId,
  suggestedAmount,
  onDepositCreated,
  contextMode = false,
  contextGuestName,
  contextRoomInfo,
  contextGuestId,
}: DepositDialogProps) {
  const [selectedBookingId, setSelectedBookingId] = useState<string>(preSelectedBookingId || '');
  const [amount, setAmount] = useState<number>(suggestedAmount || 0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [status, setStatus] = useState<DepositStatus>('received');
  const [notes, setNotes] = useState('');
  const [depositDate, setDepositDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedBookingId(preSelectedBookingId || '');
      setAmount(suggestedAmount || 0);
      setPaymentMethod('cash');
      setStatus('received');
      setNotes('');
      setDepositDate(new Date().toISOString().split('T')[0]);
    }
  }, [open, preSelectedBookingId, suggestedAmount]);

  // Update amount when booking changes
  useEffect(() => {
    if (selectedBookingId && !suggestedAmount) {
      const booking = bookings.find(b => b.id === selectedBookingId);
      if (booking?.depositAmount) {
        setAmount(booking.depositAmount);
      }
    }
  }, [selectedBookingId, bookings, suggestedAmount]);

  const selectedBooking = bookings.find(b => b.id === selectedBookingId);
  const selectedGuest = selectedBooking ? guests.find(g => g.id === selectedBooking.guestId) : null;

  const getGuestName = (guestId: string) => {
    return guests.find(g => g.id === guestId)?.name || 'Unknown Guest';
  };

  const filteredBookings = bookings.filter(b => 
    b.status === 'confirmed' || b.status === 'checked-in'
  );

  const handleSubmit = () => {
    // In context mode, we don't need a booking - just create the deposit with context guest
    if (!contextMode && !selectedBookingId) {
      toast.error('Please select a booking');
      return;
    }
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    let guestId = contextGuestId || '';
    let bookingId = selectedBookingId || '';

    if (!contextMode) {
      const booking = bookings.find(b => b.id === selectedBookingId);
      if (!booking) {
        toast.error('Booking not found');
        return;
      }
      guestId = booking.guestId;
      bookingId = booking.id;
    }

    const newDeposit: Deposit = {
      id: `DEP-${Date.now().toString(36).toUpperCase()}`,
      bookingId,
      guestId,
      amount,
      status,
      paymentMethod,
      receivedAt: status === 'received' ? new Date(depositDate).toISOString() : undefined,
      notes: notes || undefined,
    };

    onDepositCreated(newDeposit);
    toast.success('Deposit recorded successfully');
    onOpenChange(false);
  };

  const quickAmounts = selectedBooking ? [
    { label: 'Required', amount: selectedBooking.depositAmount || 0 },
    { label: '50%', amount: Math.round(selectedBooking.totalAmount * 0.5) },
    { label: 'Full', amount: selectedBooking.totalAmount },
  ] : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Record Deposit
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Context Mode Banner */}
          {contextMode && (contextGuestName || contextRoomInfo) && (
            <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg text-sm">
              <p className="font-medium text-primary">Creating deposit for:</p>
              <p className="text-muted-foreground">
                {contextGuestName && <span>{contextGuestName}</span>}
                {contextGuestName && contextRoomInfo && <span> · </span>}
                {contextRoomInfo && <span>{contextRoomInfo}</span>}
              </p>
            </div>
          )}

          {/* Booking Selection - Only show when NOT in context mode */}
          {!contextMode && (
            <div className="space-y-2">
              <Label>Booking</Label>
              <Select 
                value={selectedBookingId} 
                onValueChange={setSelectedBookingId}
                disabled={!!preSelectedBookingId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select booking" />
                </SelectTrigger>
                <SelectContent>
                  {filteredBookings.map(booking => {
                    const guest = guests.find(g => g.id === booking.guestId);
                    return (
                      <SelectItem key={booking.id} value={booking.id}>
                        <div className="flex flex-col">
                          <span>{guest?.name} - {booking.rsvpNo}</span>
                          <span className="text-xs text-muted-foreground">
                            Total: ${booking.totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Booking Info - Only show when NOT in context mode */}
          {!contextMode && selectedBooking && (
            <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guest</span>
                <span className="font-medium">{selectedGuest?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-medium">${selectedBooking.totalAmount.toLocaleString()}</span>
              </div>
              {selectedBooking.depositAmount && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Required Deposit</span>
                  <span className="font-medium">${selectedBooking.depositAmount.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}


          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                type="number"
                min={0}
                value={amount || ''}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="pl-7"
              />
            </div>
            
            {/* Quick Amount Buttons */}
            {selectedBooking && quickAmounts.length > 0 && (
              <div className="flex gap-2 mt-2">
                {quickAmounts.map((qa) => (
                  <Button
                    key={qa.label}
                    type="button"
                    variant={amount === qa.amount ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAmount(qa.amount)}
                    disabled={qa.amount === 0}
                  >
                    {qa.label} ${qa.amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(paymentMethodConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {config.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={depositDate}
              onChange={(e) => setDepositDate(e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={status === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatus('pending')}
                className="flex-1"
              >
                <Clock className="h-4 w-4 mr-2" />
                Pending
              </Button>
              <Button
                type="button"
                variant={status === 'received' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatus('received')}
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Received
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes..."
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Receipt className="h-4 w-4 mr-2" />
            Record Deposit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
