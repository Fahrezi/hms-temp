import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Control } from "react-hook-form";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import CardForm from "@/components/ui/CardForm/CardForm";
import { Input } from "@/components/ui/Input";
import { InputLabel } from "@/components/ui/InputLabel";
import { Label } from "@/components/ui/Label";
import MultiFieldInput from "@/components/ui/MultiFieldInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import SelectInput from "@/components/ui/SelectInput";
import { Textarea } from "@/components/ui/TextArea";

import { roomNumberList, roomTypeList, sellingTypeList } from "@/constants/data";
import { RoomReservation } from "@/types/hotel";

import { RHFBridgeProps } from "../types/index.type";

import { rooms } from "@/data/mock";

type StepProps = RHFBridgeProps<any>;

const HEADER_ACCOMMODATION: { label: string; value: string }[] = [
  { label: 'Type', value: 'typeAccommodation' },
  { label: 'RSVP Type', value: 'rsvpTypeAccommodation' },
  { label: 'RSC', value: 'rscAccommodation' },
  { label: 'Room', value: 'roomAccommodation' },
  { label: 'Cut Off', value: 'cutOffAccommodation' },
  { label: 'Child Amount', value: 'childAmountAccommodation' },
  { label: 'Adult Amount', value: 'adultAmountAccommodation' },
];

const INDEX_BODY = [
  'adultAmountAccommodation',
  'childAmountAccommodation',
  'cutOffAccommodation',
  'roomAccommodation',
  'rscAccommodation',
  'rsvpTypeAccommodation',
  'typeAccommodation'
];

const RATE_INDEX_BODY = [
  'from_date',
  'until_date',
  'item',
  'description',
  'item',
  'room_count',
  'nights',
  'amount',
  'rpl'
];

const HEADER_RATE = [
  { label: 'From', value: 'from_rate' },
  { label: 'Until', value: 'until_rate' },
  { label: 'Item', value: 'item' },
  { label: 'Description', value: 'description' },
  { label: '#Room', value: 'item' },
  { label: 'Qty', value: 'room_count' },
  { label: 'Nights', value: 'nights' },
  { label: 'Amount', value: 'amount' },
  { label: 'RPL', value: 'rpl' },
];

export const RoomRateForm = ({ form, errors, setValue }: StepProps) => {
  const { register, control, watch } = form;
  const valuesAccommodation = watch('accommodation');
  const valuesRate = watch('rate');

  const [roomReservations, setRoomReservations] = useState<RoomReservation[]>([
    { id: '1', roomId: '', adults: 1, children: 0, rateCode: 'rack' }
  ]);

  const availableRooms = rooms.filter(r => r.status === 'available');
  const occupiedRooms = rooms.filter(r => r.status === 'occupied');
  const maintenanceRooms = rooms.filter(r => r.status === 'maintenance');
  const cleaningRooms = rooms.filter(r => r.status === 'cleaning');

  const getUsedRoomIds = () => roomReservations.map(r => r.roomId).filter(Boolean);

  // const calculateTotal = () => {
  //   if (!formData.checkIn || !formData.checkOut) return 0;
  //   const checkIn = new Date(formData.checkIn);
  //   const checkOut = new Date(formData.checkOut);
  //   const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  //   if (nights <= 0) return 0;

  //   return roomReservations.reduce((total, reservation) => {
  //     const room = rooms.find(r => r.id === reservation.roomId);
  //     return total + (room ? room.price * nights : 0);
  //   }, 0);
  // };

  const addRoom = () => {
    setRoomReservations([
      ...roomReservations,
      { id: Date.now().toString(), roomId: '', adults: 1, children: 0, rateCode: 'rack' }
    ]);
  };

  const removeRoom = (id: string) => {
    if (roomReservations.length > 1) {
      setRoomReservations(roomReservations.filter(r => r.id !== id));
    }
  };

  const updateRoom = (id: string, field: keyof RoomReservation, value: string | number) => {
    setRoomReservations(roomReservations.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  return (
    <CardForm className="mt-6" title="Room & Rate">
      <section className="mb-6">
        <h4 className="mb-6 text-[#5b5b5b] text-xl">Booking Info</h4>
        <div className="grid grid-cols-2 gap-6">
          <InputLabel
            label="Inventory Source"
            type="text"
            placeholder="Enter RSVP Date"
            errors={errors}
            {...register('inventorySource')}
          />
          <InputLabel
            label="Reservation Type"
            type="text"
            placeholder="Enter Rate Source"
            errors={errors}
            {...register('reservationType')}
          />
          <div>
            <p className="mb-2 font-medium text-sm">Confirmation - By</p>
            <div className="grid grid-cols-2 gap-4">
              <InputLabel
                label=""
                type="text"
                placeholder="by"
                errors={errors}
                {...register('confirmation')}
              />
              <InputLabel
                label=""
                type="text"
                placeholder="confirmation"
                errors={errors}
                {...register('confirmationBy')}
              /> 
            </div>
          </div> 
          <SelectInput
            name="sellingType"
            label="Selling Type"
            control={control as Control<any>}
            placeholder="Select Type"
            options={sellingTypeList}
          />
          <Textarea
            label="Notes Detail"
            placeholder="Notes Detail"
            errors={errors}
            {...register('notesDetail')}
          /> 
        </div>
      </section>
      <div className="flex items-center justify-between mb-2">
        <Label className="text-base font-semibold">Rooms ({roomReservations.length})</Label>
        <Button type="button" variant="outline" size="sm" onClick={addRoom}>
          <Plus className="h-4 w-4 mr-1" /> Add Room
        </Button>
      </div>

      <div className="space-y-6">
        {roomReservations.map((reservation, index) => {
          const usedRoomIds = getUsedRoomIds().filter(id => id !== reservation.roomId);
          const availableForSelect = availableRooms.filter(r => !usedRoomIds.includes(r.id));
          const selectedRoom = rooms.find(r => r.id === reservation.roomId);

          return (
            <Card key={reservation.id} className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Room {index + 1}</span>
                  {roomReservations.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeRoom(reservation.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Room</Label>
                    <Select
                      value={reservation.roomId} 
                      onValueChange={(value) => updateRoom(reservation.id, 'roomId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select room" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableForSelect.map((room) => (
                          <SelectItem key={room.id} value={room.id} className="w-full overflow-hidden truncate">
                            Room {room.number} - {room.type} (${room.price}/night)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Rate Code</Label>
                    <Select 
                      value={reservation.rateCode} 
                      onValueChange={(value) => updateRoom(reservation.id, 'rateCode', value)}
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
                      value={reservation.adults}
                      onChange={(e) => updateRoom(reservation.id, 'adults', parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Children</Label>
                    <Input
                      type="number"
                      min={0}
                      value={reservation.children}
                      onChange={(e) => updateRoom(reservation.id, 'children', parseInt(e.target.value) || 0)}
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

      {/* {calculateTotal() > 0 && (
        <div className="bg-primary/10 p-4 rounded-lg mt-4">
          <p className="text-sm text-muted-foreground">Estimated Total</p>
          <p className="text-2xl font-bold">${calculateTotal().toLocaleString()}</p>
        </div>
      )} */}
    </CardForm>
  );
};