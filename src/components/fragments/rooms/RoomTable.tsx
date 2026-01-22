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

import { Room } from "@/types/hotel";

import { cn } from "@/lib/utils";

interface RoomTableProps {
  rooms: Room[];
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

export function RoomTable({ rooms, onEdit, onStatusChange }: RoomTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room #</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Housekeeping</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell className="font-medium">{room.number}</TableCell>
              <TableCell className="capitalize">{typeLabels[room.type]}</TableCell>
              <TableCell>{room.floor}</TableCell>
              <TableCell>
                <Badge className={cn("font-normal capitalize", statusStyles[room.status] || statusStyles.available)}>
                  {room.status.replace('-', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={cn("font-normal capitalize", housekeepingStyles[room.housekeepingStatus] || housekeepingStyles.clean)}>
                  {room.housekeepingStatus}
                </Badge>
              </TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>${room.price}/night</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
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
              </TableCell>
            </TableRow>
          ))}
          {rooms.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                No rooms found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
