import { 
  BedDouble,
  Building2,
  Calendar, 
  ClipboardCheck,
  Clock, 
  CreditCard, 
  DollarSign,
  FileText,
  Mail, 
  MapPin, 
  Phone, 
  User, 
  Users,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";

import { Booking, Guest, Room } from "@/types/hotel";

import { cn } from "@/lib/utils";

interface ReservationDetailSheetProps {
  booking: Booking | null;
  guest: Guest | undefined;
  room: Room | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckOut: (booking: Booking) => void;
  onCancel: (booking: Booking) => void;
}

const statusStyles = {
  'confirmed': 'bg-primary/10 text-primary border-primary/20',
  'checked-in': 'bg-success/10 text-success border-success/20',
  'checked-out': 'bg-muted text-muted-foreground border-muted-foreground/20',
  'cancelled': 'bg-destructive/10 text-destructive border-destructive/20',
};

const modeLabels: Record<string, string> = {
  'individual': 'IND',
  'block': 'BLK',
  'group': 'GRP',
  'tour-series': 'TRS',
};

export function ReservationDetailSheet({ 
  booking, 
  guest, 
  room, 
  open, 
  onOpenChange,
  onCheckOut,
  onCancel 
}: ReservationDetailSheetProps) {
  const navigate = useNavigate();

  if (!booking) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: React.ReactNode }) => (
    <div className="flex items-start gap-3 py-2">
      <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value || '-'}</p>
      </div>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto px-6">
        <SheetHeader className="space-y-4 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl font-semibold">
                {booking.rsvpNo}
              </SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Reservation Details
              </p>
            </div>
            <div className="flex gap-2">
              <Badge className={cn("capitalize", statusStyles[booking.status])}>
                {booking.status.replace('-', ' ')}
              </Badge>
              {booking.mode && (
                <Badge variant="outline" className="font-mono text-xs">
                  {modeLabels[booking.mode] || booking.mode.toUpperCase()}
                </Badge>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Booking Information */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Booking Information
            </h3>
            <Separator />
            <div className="grid grid-cols-2 gap-x-4">
              <InfoRow icon={Calendar} label="Arrival Date" value={formatDate(booking.checkIn)} />
              <InfoRow icon={Clock} label="ETA" value={booking.eta || 'Not specified'} />
              <InfoRow icon={Calendar} label="Departure Date" value={formatDate(booking.checkOut)} />
              <InfoRow icon={Calendar} label="Nights" value={calculateNights()} />
              <InfoRow icon={BedDouble} label="Room Type" value={room?.type ? room.type.charAt(0).toUpperCase() + room.type.slice(1) : 'N/A'} />
              <InfoRow icon={BedDouble} label="Room Number" value={room?.number || 'TBA'} />
              <InfoRow icon={BedDouble} label="Room Count" value={booking.roomCount || 1} />
              <InfoRow icon={Users} label="Pax" value={`${booking.adults || 0}A ${booking.children || 0}C`} />
            </div>
          </div>

          {/* Rate & Payment */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Rate & Payment
            </h3>
            <Separator />
            <div className="grid grid-cols-2 gap-x-4">
              <InfoRow icon={CreditCard} label="Rate Source" value={booking.rateSource || 'Direct'} />
              <InfoRow icon={DollarSign} label="Total Amount" value={`$${booking.totalAmount.toLocaleString()}`} />
              <InfoRow icon={CreditCard} label="Deposit" value={booking.depositAmount ? `$${booking.depositAmount}` : 'None'} />
              <InfoRow 
                icon={X} 
                label="Non-Refundable" 
                value={
                  <Badge variant={booking.isNonRefundable ? "destructive" : "outline"} className="text-xs">
                    {booking.isNonRefundable ? 'Yes' : 'No'}
                  </Badge>
                } 
              />
              {booking.groupName && (
                <InfoRow icon={Building2} label="Group Name" value={booking.groupName} />
              )}
              <InfoRow icon={FileText} label="RNW" value={booking.rnw || 0} />
            </div>
          </div>

          {/* Guest Information */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <User className="h-4 w-4" />
              Guest Information
            </h3>
            <Separator />
            {guest ? (
              <div className="grid grid-cols-2 gap-x-4">
                <InfoRow icon={User} label="Full Name" value={guest.name} />
                <InfoRow icon={Mail} label="Email" value={guest.email} />
                <InfoRow icon={Phone} label="Phone" value={guest.phone} />
                <InfoRow icon={CreditCard} label="ID Number" value={guest.idNumber} />
                <InfoRow icon={MapPin} label="Country" value={guest.country || 'Not provided'} />
                {guest.companyProfile && (
                  <InfoRow icon={Building2} label="Company" value={guest.companyProfile} />
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-2">No guest information available</p>
            )}
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Special Requests
              </h3>
              <Separator />
              <p className="text-sm py-2 bg-muted/50 rounded-md px-3">{booking.specialRequests}</p>
            </div>
          )}

          {/* System Info */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              System Info
            </h3>
            <Separator />
            <div className="grid grid-cols-2 gap-x-4 text-xs text-muted-foreground">
              <div className="py-1">
                <span>Created: </span>
                <span className="font-medium">{formatDate(booking.createdAt)}</span>
              </div>
              <div className="py-1">
                <span>By: </span>
                <span className="font-medium">{booking.createdBy || 'System'}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <Separator />
          <div className="flex gap-2 pt-2">
            {booking.status === 'confirmed' && (
              <Button 
                className="flex-1" 
                onClick={() => {
                  onOpenChange(false);
                  navigate(`/registration/${booking.id}`);
                }}
              >
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Check-In
              </Button>
            )}
            {booking.status === 'checked-in' && (
              <Button 
                className="flex-1" 
                onClick={() => {
                  onCheckOut(booking);
                  onOpenChange(false);
                }}
              >
                Check Out
              </Button>
            )}
            {booking.status !== 'cancelled' && booking.status !== 'checked-out' && (
              <Button 
                variant="destructive" 
                onClick={() => {
                  onCancel(booking);
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
