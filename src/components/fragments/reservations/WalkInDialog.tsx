import { addDays,format } from "date-fns";
import { CalendarIcon, User } from "lucide-react";
import { useMemo,useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/TextArea";

import { Booking, Guest,Room } from "@/types/hotel";

import { bookings,guests as existingGuests, rooms } from "@/data/mock";
import { cn } from "@/libs/utils";

interface WalkInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingCreated: (booking: Booking, guest: Guest) => void;
}

export function WalkInDialog({ open, onOpenChange, onBookingCreated }: WalkInDialogProps) {
  const navigate = useNavigate();
  const today = new Date();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(addDays(today, 1));
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [specialRequests, setSpecialRequests] = useState("");

  const availableRooms = useMemo(() => 
    rooms.filter(room => room.status === 'available'),
    []
  );

  const selectedRoom = useMemo(() => 
    rooms.find(r => r.id === selectedRoomId),
    [selectedRoomId]
  );

  const nights = useMemo(() => {
    if (!checkOutDate) return 0;
    const diffTime = checkOutDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [checkOutDate, today]);

  const totalAmount = useMemo(() => {
    if (!selectedRoom || nights <= 0) return 0;
    return selectedRoom.price * nights;
  }, [selectedRoom, nights]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setSelectedRoomId("");
    setCheckOutDate(addDays(new Date(), 1));
    setAdults("1");
    setChildren("0");
    setSpecialRequests("");
  };

  const handleSubmit = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter guest name");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter phone number");
      return;
    }
    if (!selectedRoomId) {
      toast.error("Please select a room");
      return;
    }
    if (!checkOutDate || nights <= 0) {
      toast.error("Please select a valid check-out date");
      return;
    }

    // Generate new IDs
    const newGuestId = `g-${Date.now()}`;
    const newBookingId = `1`;
    const rsvpNumber = `WLK-${format(today, 'yyyy')}-${String(bookings.length + 1).padStart(3, '0')}`;

    // Create new guest
    const newGuest: Guest = {
      id: newGuestId,
      name: `${firstName.trim()} ${lastName.trim()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: "",
      phone: phone.trim(),
      idNumber: "",
      status: "reserved",
      createdAt: format(today, "yyyy-MM-dd"),
    };

    // Create new booking
    const newBooking: Booking = {
      id: newBookingId,
      rsvpNo: rsvpNumber,
      guestId: newGuestId,
      roomId: selectedRoomId,
      checkIn: format(today, "yyyy-MM-dd"),
      checkOut: format(checkOutDate, "yyyy-MM-dd"),
      status: "confirmed",
      type: "walk-in",
      mode: "individual",
      totalAmount,
      adults: parseInt(adults),
      children: parseInt(children),
      roomCount: 1,
      rateSource: "Walk-in",
      createdBy: "Front Desk",
      isNonRefundable: false,
      rnw: 0,
      createdAt: format(today, "yyyy-MM-dd'T'HH:mm:ss"),
      specialRequests: specialRequests.trim() || undefined,
    };

    onBookingCreated(newBooking, newGuest);
    toast.success(`Walk-in booking ${rsvpNumber} created`);
    resetForm();
    onOpenChange(false);
    
    // Navigate to registration page
    navigate(`/registration?bookingId=${newBookingId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Walk-in Check-in
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4 overflow-y-auto flex-1 pr-2">
          {/* Guest Information */}
          <div className="space-y-4 px-1">
            <h4 className="text-sm font-medium text-muted-foreground">Guest Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="+1 555-0100"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Room Selection */}
          <div className="space-y-4 px-1">
            <h4 className="text-sm font-medium text-muted-foreground">Room Selection</h4>
            <div className="space-y-2">
              <Label>Select Room *</Label>
              <Select value={selectedRoomId} onValueChange={setSelectedRoomId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an available room..." />
                </SelectTrigger>
                <SelectContent>
                  {availableRooms.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">No rooms available</div>
                  ) : (
                    availableRooms.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        Room {room.number} - {room.type.charAt(0).toUpperCase() + room.type.slice(1)} (${room.price}/night)
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            {selectedRoom && (
              <div className="rounded-lg bg-muted/50 p-3 text-sm">
                <div className="flex justify-between">
                  <span>Room {selectedRoom.number}</span>
                  <span className="font-medium">${selectedRoom.price}/night</span>
                </div>
                <div className="text-muted-foreground capitalize">{selectedRoom.type} • Capacity: {selectedRoom.capacity}</div>
              </div>
            )}
          </div>

          {/* Stay Details */}
          <div className="space-y-4 px-1">
            <h4 className="text-sm font-medium text-muted-foreground">Stay Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Check-in</Label>
                <Input value={format(today, "MMM dd, yyyy")} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Check-out *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkOutDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      disabled={(date) => date <= today}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adults">Adults</Label>
                <Select value={adults} onValueChange={setAdults}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="children">Children</Label>
                <Select value={children} onValueChange={setChildren}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2 px-1">
            <Label htmlFor="specialRequests">Special Requests</Label>
            <Textarea
              name="specialRequests"
              id="specialRequests"
              placeholder="Any special requirements..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={2}
            />
          </div>

          {/* Summary */}
          {selectedRoom && nights > 0 && (
            <div className="rounded-lg border bg-card p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{nights} night{nights > 1 ? 's' : ''} × ${selectedRoom.price}</span>
                <span className="font-semibold text-lg">${totalAmount}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Continue to Registration →
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
