import { differenceInDays,format } from "date-fns";
import { 
  Building,
  Calendar, 
  Clock,
  DoorOpen,
  FileText, 
  Mail, 
  MapPin, 
  Pencil,
  Phone, 
  User} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";

import { Booking, Guest, GuestHotelStatus,Room } from "@/types/hotel";

import { cn } from "@/libs/utils";

interface GuestDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guest: Guest | null;
  currentBooking: Booking | null;
  currentRoom: Room | null;
  hotelStatus: GuestHotelStatus;
  pastBookings: Booking[];
  rooms: Room[];
  onEdit: (guest: Guest) => void;
}

const hotelStatusStyles: Record<GuestHotelStatus, string> = {
  'in-house': 'bg-success/10 text-success border-success/20',
  'arriving-today': 'bg-info/10 text-info border-info/20',
  'arriving-soon': 'bg-warning/10 text-warning border-warning/20',
  'reserved': 'bg-primary/10 text-primary border-primary/20',
  'departing-today': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  'departed': 'bg-muted text-muted-foreground border-muted-foreground/20',
  'no-reservation': 'bg-muted text-muted-foreground border-muted-foreground/20',
};

const hotelStatusLabels: Record<GuestHotelStatus, string> = {
  'in-house': 'In-House',
  'arriving-today': 'Arriving Today',
  'arriving-soon': 'Arriving Soon',
  'reserved': 'Reserved',
  'departing-today': 'Departing Today',
  'departed': 'Departed',
  'no-reservation': 'No Reservation',
};

export function GuestDetailSheet({ 
  open, 
  onOpenChange, 
  guest, 
  currentBooking,
  currentRoom,
  hotelStatus,
  pastBookings,
  rooms,
  onEdit
}: GuestDetailSheetProps) {
  if (!guest) return null;

  const nights = currentBooking 
    ? differenceInDays(new Date(currentBooking.checkOut), new Date(currentBooking.checkIn))
    : 0;

  const getRoomInfo = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? `${room.number} (${room.type})` : 'N/A';
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto px-6">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-2xl">{guest.name}</SheetTitle>
              <Badge className={cn("mt-2 font-normal", hotelStatusStyles[hotelStatus])}>
                {hotelStatusLabels[hotelStatus]}
              </Badge>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Current Stay */}
          {currentBooking && currentRoom && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wide">
                <DoorOpen className="h-4 w-4" />
                Current Stay
              </h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Room</span>
                    <p className="font-medium">{currentRoom.number} - {currentRoom.type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">RSVP No.</span>
                    <p className="font-medium">{currentBooking.rsvpNo}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Check-In</span>
                    <p className="font-medium">{format(new Date(currentBooking.checkIn), 'MMM d, yyyy')}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Check-Out</span>
                    <p className="font-medium">{format(new Date(currentBooking.checkOut), 'MMM d, yyyy')}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Nights</span>
                    <p className="font-medium">{nights}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total</span>
                    <p className="font-medium">${currentBooking.totalAmount}</p>
                  </div>
                </div>
                {currentBooking.specialRequests && (
                  <div className="pt-2 border-t border-border/50">
                    <span className="text-muted-foreground text-sm">Special Requests</span>
                    <p className="text-sm mt-1">{currentBooking.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <Separator />

          {/* Personal Information */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wide">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>{guest.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>{guest.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>{guest.idType ? `${guest.idType}: ` : 'ID: '}{guest.idNumber}</span>
              </div>
              {guest.country && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{guest.country}</span>
                </div>
              )}
              {guest.detailAddress && (
                <div className="flex items-center gap-3 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{guest.detailAddress}</span>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {guest.notes && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wide">
                  <FileText className="h-4 w-4" />
                  Notes
                </h3>
                <p className="text-sm bg-muted/50 p-3 rounded-lg">{guest.notes}</p>
              </div>
            </>
          )}

          {/* Stay History */}
          {pastBookings.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wide">
                  <Clock className="h-4 w-4" />
                  Stay History
                </h3>
                <div className="space-y-2">
                  {pastBookings.slice(0, 5).map((booking) => {
                    const bookingNights = differenceInDays(
                      new Date(booking.checkOut), 
                      new Date(booking.checkIn)
                    );
                    return (
                      <div 
                        key={booking.id} 
                        className="flex items-center justify-between text-sm bg-muted/30 p-3 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            {format(new Date(booking.checkIn), 'MMM yyyy')} - Room {getRoomInfo(booking.roomId)}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {bookingNights} night{bookingNights !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {booking.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Actions */}
          {/* <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                onEdit(guest);
                onOpenChange(false);
              }}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Guest
            </Button>
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
