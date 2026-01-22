import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import { Booking, Guest, GuestHotelStatus,Room } from "@/types/hotel";

import { cn } from "@/lib/utils";

interface GuestTableProps {
  guests: Guest[];
  bookings: Booking[];
  rooms: Room[];
  getGuestBooking: (guestId: string) => Booking | undefined;
  getGuestHotelStatus: (guestId: string) => GuestHotelStatus;
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

export function GuestTable({ 
  guests, 
  bookings, 
  rooms, 
  getGuestBooking, 
  getGuestHotelStatus,
  onEdit, 
  onView 
}: GuestTableProps) {
  const getRoomInfo = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? `${room.number} (${room.type.charAt(0).toUpperCase() + room.type.slice(1)})` : '—';
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Arrival</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => {
            const booking = getGuestBooking(guest.id);
            const hotelStatus = getGuestHotelStatus(guest.id);
            
            return (
              <TableRow 
                key={guest.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onView(guest)}
              >
                <TableCell className="font-medium">{guest.name}</TableCell>
                <TableCell>
                  <Badge className={cn("font-normal", hotelStatusStyles[hotelStatus])}>
                    {hotelStatusLabels[hotelStatus]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {booking ? getRoomInfo(booking.roomId) : '—'}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {booking ? format(new Date(booking.checkIn), 'MMM d') : '—'}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {booking ? format(new Date(booking.checkOut), 'MMM d') : '—'}
                </TableCell>
                <TableCell className="text-muted-foreground">{guest.phone}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView(guest); }}>
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(guest); }}>
                        Edit Guest
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
          {guests.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                No guests found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
