import { BedDouble, Calendar, ClipboardCheck,DollarSign, MoreVertical, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import { Booking, Guest, Room } from "@/types/hotel";

import { cn } from "@/libs/utils";

interface BookingCardProps {
  booking: Booking;
  guest?: Guest;
  room?: Room;
  onCheckOut: (booking: Booking) => void;
  onCancel: (booking: Booking) => void;
}

const statusStyles = {
  'confirmed': 'bg-primary/10 text-primary border-primary/20',
  'checked-in': 'bg-success/10 text-success border-success/20',
  'checked-out': 'bg-muted text-muted-foreground border-muted-foreground/20',
  'cancelled': 'bg-destructive/10 text-destructive border-destructive/20',
};

export function BookingCard({ booking, guest, room, onCheckOut, onCancel }: BookingCardProps) {
  const navigate = useNavigate();
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleRegistration = () => {
    navigate(`/registration/${booking.id}`);
  };

  return (
    <Card className="card-hover">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold font-mono text-sm">{booking.rsvpNo}</h3>
              {booking.type === 'walk-in' && (
                <Badge variant="outline" className="text-xs font-normal">Walk-in</Badge>
              )}
            </div>
            <Badge className={cn("mt-1 font-normal capitalize", statusStyles[booking.status])}>
              {booking.status.replace('-', ' ')}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {booking.status === 'confirmed' && (
                <DropdownMenuItem onClick={handleRegistration}>
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

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4 shrink-0" />
            <span>{guest?.name || 'Unknown Guest'}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BedDouble className="h-4 w-4 shrink-0" />
            <span>Room {room?.number || 'N/A'} ({room?.type || 'N/A'})</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground font-medium">
            <DollarSign className="h-4 w-4 shrink-0" />
            <span>${booking.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {booking.specialRequests && (
          <p className="mt-3 text-xs text-muted-foreground bg-muted p-2 rounded">
            {booking.specialRequests}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
