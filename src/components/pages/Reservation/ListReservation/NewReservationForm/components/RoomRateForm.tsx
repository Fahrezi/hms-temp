import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { RoomReservation } from "@/types/hotel";
import { Room } from "@/types/hotel";
import { Plus, Trash2, Clock } from "lucide-react";

import { RHFBridgeProps } from "../types/index.type";

import { useFieldArray } from "react-hook-form";
import CardForm from "@/components/ui/CardForm/CardForm";
import { rooms } from "@/data/mock";

interface RoomRateTabProps {
  isWalkIn: boolean;
  today: string;
}

type StepProps = RHFBridgeProps<any> & RoomRateTabProps;

export const RoomRateForm = ({
  form,
  setValue,
  isWalkIn,
  today,
}: StepProps) => {
  const { register, control, watch } = form;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "accommodation"
  });

  // Type cast fields to RoomReservation for proper typing
  const typedFields = fields as unknown as RoomReservation[];

  const checkIn = watch('arrival');
  const checkOut = watch('departure');
  const eta = watch('ETA');
  const etd = watch('ETD');

  const availableRooms = rooms.filter(r => r.status === 'available');

  const getUsedRoomIds = () => typedFields.map(r => r.roomId).filter(Boolean);

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return 0;

    return typedFields.reduce((total, reservation) => {
      const room = rooms.find(r => r.id === reservation.roomId);
      return total + (room ? room.price * nights : 0);
    }, 0);
  };

  const addRoom = () => {
    append({ id: Date.now().toString(), roomId: '', adults: 1, children: 0, rateCode: 'rack' });
  };


  return (
    <CardForm title="Room & Rate">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label>Check-in Date</Label>
          <Input
            type="date"
            value={checkIn}
            onChange={(e) => setValue('arrival', e.target.value)}
            min={isWalkIn ? today : undefined}
            max={isWalkIn ? today : undefined}
            disabled={isWalkIn}
          />
          {isWalkIn && (
            <p className="text-xs text-muted-foreground">Walk-ins check in today</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Check-out Date</Label>
          <Input
            type="date"
            value={checkOut}
            onChange={(e) => setValue('departure', e.target.value)}
            min={checkIn || today}
          />
        </div>
      </div>

      {/* ETA / ETD Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            ETA (Expected Time of Arrival)
          </Label>
          <Input
            type="time"
            value={eta instanceof Date ? eta.toTimeString().slice(0, 5) : eta}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':');
              const newDate = new Date();
              newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
              setValue('ETA', newDate);
            }}
          />
          <p className="text-xs text-muted-foreground">Standard check-in: 3:00 PM</p>
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            ETD (Expected Time of Departure)
          </Label>
          <Input
            type="time"
            value={etd instanceof Date ? etd.toTimeString().slice(0, 5) : etd}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':');
              const newDate = new Date();
              newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
              setValue('ETD', newDate);
            }}
          />
          <p className="text-xs text-muted-foreground">Standard check-out: 11:00 AM</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <Label className="text-base font-semibold">Rooms ({fields.length})</Label>
        <Button type="button" variant="outline" size="sm" onClick={addRoom}>
          <Plus className="h-4 w-4 mr-1" /> Add Room
        </Button>
      </div>

      <div className="space-y-4">
        {typedFields.map((field, index) => {
          const usedRoomIds = getUsedRoomIds().filter(id => id !== field.roomId);
          const availableForSelect = availableRooms.filter(r => !usedRoomIds.includes(r.id));
          const selectedRoom = rooms.find(r => r.id === field.roomId);

          return (
            <Card key={fields[index].id} className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Room {index + 1}</span>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Room</Label>
                    <Select
                      value={field.roomId}
                      onValueChange={(value) => {
                        update(index, { ...field, roomId: value });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select room" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableForSelect.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            Room {room.number} - {room.type} (${room.price}/night)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Rate Code</Label>
                    <Select
                      value={field.rateCode}
                      onValueChange={(value) => {
                        update(index, { ...field, rateCode: value });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rack">RACK - Standard</SelectItem>
                        <SelectItem value="corp">CORP - Corporate</SelectItem>
                        <SelectItem value="gov">GOV - Government</SelectItem>
                        <SelectItem value="promo">PROMO - Promotional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Adults</Label>
                    <Input
                      type="number"
                      min={1}
                      max={selectedRoom?.capacity || 10}
                      value={field.adults}
                      onChange={(e) => {
                        update(index, { ...field, adults: parseInt(e.target.value) || 1 });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Children</Label>
                    <Input
                      type="number"
                      min={0}
                      value={field.children}
                      onChange={(e) => {
                        update(index, { ...field, children: parseInt(e.target.value) || 0 });
                      }}
                    />
                  </div>
                </div>
                {selectedRoom && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Capacity: {selectedRoom.capacity}</span>
                    <span>•</span>
                    <span>Floor: {selectedRoom.floor}</span>
                    <span>•</span>
                    <div className="flex gap-1">
                      {selectedRoom.amenities.slice(0, 3).map((a) => (
                        <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                      ))}
                      {selectedRoom.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">+{selectedRoom.amenities.length - 3}</Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {calculateTotal() > 0 && (
        <div className="bg-primary/10 p-4 rounded-lg mt-4">
          <p className="text-sm text-muted-foreground">Estimated Total</p>
          <p className="text-2xl font-bold">${calculateTotal().toLocaleString()}</p>
        </div>
      )}
    </CardForm>
  );
};