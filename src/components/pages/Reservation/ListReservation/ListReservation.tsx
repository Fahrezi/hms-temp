import { Plus, Search,UserPlus } from "lucide-react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { BookingCard } from "@/components/fragments/reservations/BookingCards";
import { BookingTable } from "@/components/fragments/reservations/BookingTable";
import { ReservationDetailSheet } from "@/components/fragments/reservations/ReservationDetailSheet";
import { WalkInDialog } from "@/components/fragments/reservations/WalkInDialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { ViewMode,ViewToggle } from "@/components/ui/ViewToggle";

import { Booking, Guest } from "@/types/hotel";

import { bookings as initialBookings, guests as initialGuests, rooms } from "@/data/mock";

const VIEW_STORAGE_KEY = "reservations-view-mode";

export default function Reservations() {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return (localStorage.getItem(VIEW_STORAGE_KEY) as ViewMode) || "grid";
  });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [walkInDialogOpen, setWalkInDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(VIEW_STORAGE_KEY, viewMode);
  }, [viewMode]);

  const filteredBookings = bookings.filter(b => {
    const statusMatch = statusFilter === "all" || b.status === statusFilter;
    const typeMatch = typeFilter === "all" || b.type === typeFilter;
    const searchMatch = searchQuery === "" || 
      b.rsvpNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guests.find(g => g.id === b.guestId)?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && typeMatch && searchMatch;
  });

  const handleCheckOut = (booking: Booking) => {
    setBookings(bookings.map(b => b.id === booking.id ? { ...b, status: 'checked-out' } : b));
    toast.success("Guest checked out");
  };

  const handleCancel = (booking: Booking) => {
    setBookings(bookings.map(b => b.id === booking.id ? { ...b, status: 'cancelled' } : b));
    toast.success("Booking cancelled");
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailSheetOpen(true);
  };

  const handleWalkInBookingCreated = (booking: Booking, guest: Guest) => {
    setBookings(prev => [...prev, booking]);
    setGuests(prev => [...prev, guest]);
  };


  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search RSVP# or guest..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-[220px]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[140px]"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="reservation">Reservations</SelectItem>
                <SelectItem value="walk-in">Walk-ins</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <ViewToggle view={viewMode} onViewChange={setViewMode} />
            <Button variant="outline" onClick={() => setWalkInDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />Walk-in
            </Button>
            <Button onClick={() => navigate('/reservation/new?type=reservation')}>
              <Plus className="h-4 w-4 mr-2" />New Reservation
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBookings.map(booking => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                guest={guests.find(g => g.id === booking.guestId)} 
                room={rooms.find(r => r.id === booking.roomId)} 
                onCheckOut={handleCheckOut} 
                onCancel={handleCancel} 
              />
            ))}
          </div>
        ) : (
          <BookingTable 
            bookings={filteredBookings} 
            guests={guests} 
            rooms={rooms} 
            onCheckOut={handleCheckOut} 
            onCancel={handleCancel}
            onViewDetails={handleViewDetails}
          />
        )}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No reservations found matching your criteria
          </div>
        )}
      </div>

      <ReservationDetailSheet
        booking={selectedBooking}
        guest={selectedBooking ? guests.find(g => g.id === selectedBooking.guestId) : undefined}
        room={selectedBooking ? rooms.find(r => r.id === selectedBooking.roomId) : undefined}
        open={detailSheetOpen}
        onOpenChange={setDetailSheetOpen}
        onCheckOut={handleCheckOut}
        onCancel={handleCancel}
      />
      <WalkInDialog
        open={walkInDialogOpen}
        onOpenChange={setWalkInDialogOpen}
        onBookingCreated={handleWalkInBookingCreated}
      />
    </div>
  );
}
