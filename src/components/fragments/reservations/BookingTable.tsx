import { ClipboardCheck, Eye,MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

import { Booking, Guest, Room } from "@/types/hotel";

import { cn } from "@/libs/utils";

interface BookingTableProps {
  bookings: Booking[];
  guests: Guest[];
  rooms: Room[];
  onCheckOut: (booking: Booking) => void;
  onCancel: (booking: Booking) => void;
  onViewDetails: (booking: Booking) => void;
}

const statusStyles = {
  'confirmed': 'bg-primary/10 text-primary border-primary/20',
  'checked-in': 'bg-success/10 text-success border-success/20',
  'checked-out': 'bg-muted text-muted-foreground border-muted-foreground/20',
  'cancelled': 'bg-destructive/10 text-destructive border-destructive/20',
};

const modeStyles = {
  'individual': 'bg-info/10 text-info border-info/20',
  'block': 'bg-warning/10 text-warning border-warning/20',
  'group': 'bg-success/10 text-success border-success/20',
  'tour-series': 'bg-primary/10 text-primary border-primary/20',
};

const modeLabels: Record<string, string> = {
  'individual': 'IND',
  'block': 'BLK',
  'group': 'GRP',
  'tour-series': 'TRS',
};

export function BookingTable({ bookings, guests, rooms, onCheckOut, onCancel, onViewDetails }: BookingTableProps) {
  const navigate = useNavigate();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getGuest = (guestId: string) => guests.find(g => g.id === guestId);
  const getRoom = (roomId: string) => rooms.find(r => r.id === roomId);

  const formatPax = (adults?: number, children?: number) => {
    const a = adults || 0;
    const c = children || 0;
    return `${a}A${c > 0 ? ` ${c}C` : ''}`;
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">RSVP #</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Guest</TableHead>
            <TableHead className="font-semibold">Room</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Arrival</TableHead>
            <TableHead className="font-semibold">Pax</TableHead>
            <TableHead className="font-semibold">Mode</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => {
            const guest = getGuest(booking.guestId);
            const room = getRoom(booking.roomId);
            
            return (
              <TableRow 
                key={booking.id} 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => onViewDetails(booking)}
              >
                <TableCell className="font-mono text-sm font-medium">
                  {booking.rsvpNo}
                </TableCell>
                <TableCell>
                  <Badge className={cn("font-normal capitalize text-xs", statusStyles[booking.status])}>
                    {booking.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {guest?.name?.split(' ').pop() || 'Unknown'}
                </TableCell>
                <TableCell>
                  <span className="font-mono">{room?.number || 'TBA'}</span>
                  <span className="text-muted-foreground text-xs ml-1 capitalize">
                    ({room?.type || 'N/A'})
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs font-normal capitalize">
                    {booking.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatDate(booking.checkIn)}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {formatPax(booking.adults, booking.children)}
                </TableCell>
                <TableCell>
                  {booking.mode && (
                    <Badge 
                      variant="outline" 
                      className={cn("font-mono text-xs", modeStyles[booking.mode])}
                    >
                      {modeLabels[booking.mode] || booking.mode}
                    </Badge>
                  )}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => onViewDetails(booking)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDetails(booking)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {booking.status === 'confirmed' && (
                          <DropdownMenuItem onClick={() => navigate(`/registration/${booking.id}`)}>
                            <ClipboardCheck className="h-4 w-4 mr-2" />
                            Registration / Check-In
                          </DropdownMenuItem>
                        )}
                        {booking.status === 'checked-in' && (
                          <DropdownMenuItem onClick={() => onCheckOut(booking)}>Check Out</DropdownMenuItem>
                        )}
                        {booking.status !== 'cancelled' && booking.status !== 'checked-out' && (
                          <DropdownMenuItem onClick={() => onCancel(booking)} className="text-destructive">
                            Cancel Booking
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {bookings.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                No reservations found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
