import { differenceInDays,format } from "date-fns";
import { Calendar, DoorOpen, Eye,Mail, Phone } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

import { Booking, Guest, GuestHotelStatus,Room } from "@/types/hotel";

import { cn } from "@/libs/utils";

interface GuestCardProps {
  guest: Guest;
  booking?: Booking;
  room?: Room;
  hotelStatus: GuestHotelStatus;
  onEdit: (guest: Guest) => void;
  onView: (guest: Guest) => void;
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

export function GuestCard({ guest, booking, room, hotelStatus, onEdit, onView }: GuestCardProps) {
  const nights = booking 
    ? differenceInDays(new Date(booking.checkOut), new Date(booking.checkIn))
    : 0;

  return (
    <Card className="card-hover">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold">{guest.name}</h3>
            <Badge className={cn("mt-1 font-normal", hotelStatusStyles[hotelStatus])}>
              {hotelStatusLabels[hotelStatus]}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          {/* Room Info */}
          {room && (
            <div className="flex items-center gap-2 text-foreground font-medium">
              <DoorOpen className="h-4 w-4 shrink-0 text-primary" />
              <span>Room {room.number} ({room.type.charAt(0).toUpperCase() + room.type.slice(1)})</span>
            </div>
          )}
          
          {/* Stay Dates */}
          {booking && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 shrink-0" />
              <span>
                {format(new Date(booking.checkIn), 'MMM d')} - {format(new Date(booking.checkOut), 'MMM d')} ({nights} nights)
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{guest.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0" />
            <span>{guest.phone}</span>
          </div>
        </div>

        {guest.notes && (
          <p className="mt-3 text-xs text-muted-foreground bg-muted p-2 rounded">
            {guest.notes}
          </p>
        )}

        <div className="mt-4 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView(guest)}
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
