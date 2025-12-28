import { BedDouble, DollarSign, MoreVertical,Users } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import { Room } from "@/types/hotel";

import { cn } from "@/libs/utils";

interface RoomCardProps {
  room: Room;
  onEdit: (room: Room) => void;
  onStatusChange: (room: Room, status: Room['status']) => void;
}

const statusStyles: Record<string, string> = {
  available: 'bg-success/10 text-success border-success/20',
  occupied: 'bg-primary/10 text-primary border-primary/20',
  maintenance: 'bg-destructive/10 text-destructive border-destructive/20',
  cleaning: 'bg-warning/10 text-warning border-warning/20',
  'out-of-order': 'bg-destructive/10 text-destructive border-destructive/20',
  'house-use': 'bg-info/10 text-info border-info/20',
  'complimentary': 'bg-primary/10 text-primary border-primary/20',
};

const housekeepingStyles: Record<string, string> = {
  clean: 'bg-success/10 text-success border-success/20',
  dirty: 'bg-destructive/10 text-destructive border-destructive/20',
  inspected: 'bg-info/10 text-info border-info/20',
};

const typeLabels = {
  single: 'Single',
  double: 'Double',
  suite: 'Suite',
  deluxe: 'Deluxe',
};

export function RoomCard({ room, onEdit, onStatusChange }: RoomCardProps) {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
        <div>
          <h3 className="text-lg font-semibold">Room {room.number}</h3>
          <p className="text-sm text-muted-foreground">{typeLabels[room.type]} • Floor {room.floor}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(room)}>Edit Room</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(room, 'available')}>Mark Available</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(room, 'cleaning')}>Mark Cleaning</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(room, 'maintenance')}>Mark Maintenance</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(room, 'out-of-order')}>Mark Out of Order</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(room, 'house-use')}>Mark House Use</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(room, 'complimentary')}>Mark Complimentary</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Badge className={cn("font-normal capitalize", statusStyles[room.status] || statusStyles.available)}>
            {room.status.replace('-', ' ')}
          </Badge>
          <Badge className={cn("font-normal capitalize", housekeepingStyles[room.housekeepingStatus] || housekeepingStyles.clean)}>
            {room.housekeepingStatus}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{room.capacity} {room.capacity > 1 ? 'guests' : 'guest'}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>${room.price}/night</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs font-normal">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs font-normal">
              +{room.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
