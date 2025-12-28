import { differenceInDays, isFuture, isToday, parseISO } from "date-fns";
import { Search } from "lucide-react";
import { useEffect,useState } from "react";
import { toast } from "sonner";

import { GuestCard } from "@/components/fragments/guest/GuestCard";
import { GuestDetailSheet } from "@/components/fragments/guest/GuestDetailSheet";
import { GuestDialog } from "@/components/fragments/guest/GuestDialog";
import { GuestTable } from "@/components/fragments/guest/GuestTable";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { ViewMode,ViewToggle } from "@/components/ui/ViewToggle";

import { Booking, Guest, GuestHotelStatus } from "@/types/hotel";

import { bookings, guests as initialGuests, rooms } from "@/data/mock";

const VIEW_STORAGE_KEY = "guests-view-mode";

export default function Guests() {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return (localStorage.getItem(VIEW_STORAGE_KEY) as ViewMode) || "grid";
  });

  useEffect(() => {
    localStorage.setItem(VIEW_STORAGE_KEY, viewMode);
  }, [viewMode]);

   // Get guest's current/upcoming booking (most relevant one)
  const getGuestBooking = (guestId: string): Booking | undefined => {
    const guestBookings = bookings.filter(b => b.guestId === guestId);
    
    // First, try to find checked-in booking
    const checkedIn = guestBookings.find(b => b.status === 'checked-in');
    if (checkedIn) return checkedIn;
    
    // Then, find confirmed booking (upcoming)
    const confirmed = guestBookings.find(b => b.status === 'confirmed');
    if (confirmed) return confirmed;
    
    // Finally, return most recent checked-out
    const checkedOut = guestBookings
      .filter(b => b.status === 'checked-out')
      .sort((a, b) => new Date(b.checkOut).getTime() - new Date(a.checkOut).getTime());
    
    return checkedOut[0];
  };

  // Get guest's hotel status based on booking
  const getGuestHotelStatus = (guestId: string): GuestHotelStatus => {
    const booking = getGuestBooking(guestId);
    
    if (!booking) return 'no-reservation';
    
    const checkInDate = parseISO(booking.checkIn);
    const checkOutDate = parseISO(booking.checkOut);
    const today = new Date();
    
    if (booking.status === 'checked-in') {
      if (isToday(checkOutDate)) return 'departing-today';
      return 'in-house';
    }
    
    if (booking.status === 'confirmed') {
      if (isToday(checkInDate)) return 'arriving-today';
      if (isFuture(checkInDate) && differenceInDays(checkInDate, today) <= 3) return 'arriving-soon';
      return 'reserved';
    }
    
    if (booking.status === 'checked-out') {
      return 'departed';
    }
    
    return 'no-reservation';
  };

  // Get room for a booking
  const getBookingRoom = (booking?: Booking) => {
    if (!booking) return undefined;
    return rooms.find(r => r.id === booking.roomId);
  };

  // Get past bookings for a guest
  const getPastBookings = (guestId: string): Booking[] => {
    return bookings
      .filter(b => b.guestId === guestId && b.status === 'checked-out')
      .sort((a, b) => new Date(b.checkOut).getTime() - new Date(a.checkOut).getTime());
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(search.toLowerCase()) || guest.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || guest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSave = (guestData: Partial<Guest>) => {
    if (guestData.id) {
      setGuests(guests.map(g => g.id === guestData.id ? { ...g, ...guestData } as Guest : g));
      toast.success("Guest updated successfully");
    } else {
      const newGuest = { ...guestData, id: String(guests.length + 1) } as Guest;
      setGuests([...guests, newGuest]);
      toast.success("Guest added successfully");
    }
  };

  const handleEdit = (guest: Guest) => {
    setEditingGuest(guest);
    setDialogOpen(true);
  };

  const handleView = (guest: Guest) => {
    setSelectedGuest(guest);
    setDetailSheetOpen(true);
  };

  const selectedGuestBooking = selectedGuest ? getGuestBooking(selectedGuest.id) : null;
  const selectedGuestRoom = getBookingRoom(selectedGuestBooking);
  const selectedGuestHotelStatus = selectedGuest ? getGuestHotelStatus(selectedGuest.id) : 'no-reservation';
  const selectedGuestPastBookings = selectedGuest ? getPastBookings(selectedGuest.id) : [];

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search guests..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3">
            <ViewToggle view={viewMode} onViewChange={setViewMode} />
            {/* <Button onClick={() => { setEditingGuest(null); setDialogOpen(true); }}><Plus className="h-4 w-4 mr-2" />Add Guest</Button> */}
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGuests.map(guest => {
              const booking = getGuestBooking(guest.id);
              const room = getBookingRoom(booking);
              const hotelStatus = getGuestHotelStatus(guest.id);
              return (
                <GuestCard 
                  key={guest.id} 
                  guest={guest} 
                  booking={booking}
                  room={room}
                  hotelStatus={hotelStatus}
                  onEdit={handleEdit} 
                  onView={handleView} 
                />
              );
            })}
          </div>
        ) : (
          <GuestTable 
            guests={filteredGuests} 
            bookings={bookings}
            rooms={rooms}
            getGuestBooking={getGuestBooking}
            getGuestHotelStatus={getGuestHotelStatus}
            onEdit={handleEdit} 
            onView={handleView} 
          />
        )}
      </div>
      <GuestDialog open={dialogOpen} onOpenChange={setDialogOpen} guest={editingGuest} onSave={handleSave} />
      <GuestDetailSheet
        open={detailSheetOpen}
        onOpenChange={setDetailSheetOpen}
        guest={selectedGuest}
        currentBooking={selectedGuestBooking}
        currentRoom={selectedGuestRoom || null}
        hotelStatus={selectedGuestHotelStatus}
        pastBookings={selectedGuestPastBookings}
        rooms={rooms}
        onEdit={handleEdit}
      />
    </div>
  );
}
