import { Control } from "react-hook-form";

import CardForm from "@/components/ui/CardForm/CardForm";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Textarea } from "@/components/ui/TextArea";

import { hourList, purposeOfVisitList, segmentMarketList, sourceOfBusinessList } from "@/constants/data";

import { RHFBridgeProps } from "../types/index.type";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { rooms } from "@/data/mock";
import { Guest } from "@/types/guest";
import { GuestDetail, Room, RoomReservation } from "@/types/hotel";

interface RsvpInfoTabProps {
  guests: Guest[];
  rooms: Room[];
}

type StepProps = RHFBridgeProps<any> & RsvpInfoTabProps;

export const RsvpForm = ({
  form,
  guests,
  setValue
}: StepProps) => {
  const { register, control, watch } = form;
  
  // Watch form values for guest selection and details
  const selectedGuestId = watch('selectedGuestId') || '';
  const isNewGuest = watch('isNewGuest') || false;
  const firstName = watch('firstName') || '';
  const lastName = watch('lastName') || '';
  const email = watch('email') || '';
  const phoneNumberRsvp = watch('phoneNumberRsvp') || '';
  const accommodation = watch('accommodation') || [];
  
  const handleGuestSelect = (guestId: string) => {
    setValue('selectedGuestId', guestId);
    setValue('isNewGuest', false);
    
    // Populate form with selected guest data
    const selectedGuest = guests.find(g => String(g.id) === guestId);
    if (selectedGuest) {
      // Split name into firstName and lastName
      const nameParts = selectedGuest.name.split(' ');
      const firstName = nameParts[0] ?? '';
      const lastName = nameParts.slice(1).join(' ') ?? '';
      
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('email', selectedGuest.email ?? '');
      setValue('phoneNumberRsvp', selectedGuest.phone ?? '');
    }
  };
  
  const handleNewGuest = () => {
    setValue('isNewGuest', true);
    setValue('selectedGuestId', '');
    // Clear guest fields
    setValue('firstName', '');
    setValue('lastName', '');
    setValue('email', '');
    setValue('phoneNumberRsvp', '');
  };
  
  return (
    <CardForm className="mt-6" title="RSVP Info">
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <Label className="text-base font-semibold">Guest Selection</Label>
          <Button
            type="button"
            variant={isNewGuest ? "default" : "outline"}
            size="sm"
            onClick={handleNewGuest}
          >
            <Plus className="h-4 w-4 mr-1" /> New Guest
          </Button>
        </div>

        {!isNewGuest && (
          <div className="space-y-2">
            <Label>Select Existing Guest</Label>
            <Select value={selectedGuestId} onValueChange={handleGuestSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a guest from the list" />
              </SelectTrigger>
              <SelectContent>
                {guests.map((guest) => (
                  <SelectItem key={guest.id} value={String(guest.id)}>
                    {guest.name} - {guest.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {(selectedGuestId || isNewGuest) && (
          <Card className="bg-muted/50">
            <CardHeader className="py-3">
              <CardTitle className="text-sm">
                {isNewGuest ? "New Guest Information" : "Update Guest Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name *</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setValue('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name *</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setValue('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setValue('email', e.target.value)}
                    placeholder="guest@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={phoneNumberRsvp}
                    onChange={(e) => setValue('phoneNumberRsvp', e.target.value)}
                    placeholder="+1 555-0100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Room Assignment Summary */}
        {/* {accommodation.some(r => r.roomId) && (
          <Card className="bg-muted/50">
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Room Assignment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {accommodation.filter(r => r.roomId).map((res, idx) => {
                  const room = rooms.find(r => r.id === res.roomId);
                  return (
                    <div key={res.id} className="flex justify-between text-sm">
                      <span>Room {idx + 1}: {room?.number} ({room?.type})</span>
                      <span>{res.adults} Adults, {res.children} Children</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )} */}
      </div>
    </CardForm>
  );
};