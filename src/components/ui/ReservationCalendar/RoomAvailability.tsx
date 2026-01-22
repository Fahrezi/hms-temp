import { useState, useMemo } from "react";
import { Room, Booking, Guest } from "@/types/hotel";
import { CalendarHeader, ViewRange } from "./CalendarHeader";
import { BookingBlock } from "./BookingBlock";
import { format, addDays, startOfDay, differenceInDays, isToday, isBefore, isAfter } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ScrollArea";
import { Badge } from "../Badge";

interface RoomAvailabilityCalendarProps {
  rooms: Room[];
  bookings: Booking[];
  guests: Guest[];
  onBookingClick: (booking: Booking) => void;
}

const roomTypeColors: Record<string, string> = {
  single: "bg-slate-100",
  double: "bg-blue-50",
  suite: "bg-purple-50",
  deluxe: "bg-amber-50",
};

const statusBadgeVariants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  available: "default",
  occupied: "secondary",
  cleaning: "outline",
  maintenance: "destructive",
  "house-use": "outline",
};

export function RoomAvailabilityCalendar({
  rooms,
  bookings,
  guests,
  onBookingClick,
}: RoomAvailabilityCalendarProps) {
  const [startDate, setStartDate] = useState<Date>(() => startOfDay(new Date()));
  const [viewRange, setViewRange] = useState<ViewRange>(14);
  const [floorFilter, setFloorFilter] = useState<string>("all");

  const floors = useMemo(() => {
    const uniqueFloors = [...new Set(rooms.map((r) => r.floor))];
    return uniqueFloors.sort((a, b) => a - b);
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    return rooms
      .filter((r) => floorFilter === "all" || r.floor === Number(floorFilter))
      .sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }));
  }, [rooms, floorFilter]);

  const dateColumns = useMemo(() => {
    return Array.from({ length: viewRange }, (_, i) => addDays(startDate, i));
  }, [startDate, viewRange]);

  const getBookingsForRoom = (roomId: string) => {
    const endDate = addDays(startDate, viewRange);
    return bookings.filter((b) => {
      if (b.roomId !== roomId) return false;
      const checkIn = startOfDay(new Date(b.checkIn));
      const checkOut = startOfDay(new Date(b.checkOut));
      // Booking overlaps with view range if it starts before end and ends after start
      return isBefore(checkIn, endDate) && isAfter(checkOut, startDate);
    });
  };

  const calculateBlockPosition = (booking: Booking) => {
    const checkIn = startOfDay(new Date(booking.checkIn));
    const checkOut = startOfDay(new Date(booking.checkOut));
    const viewEnd = addDays(startDate, viewRange);

    // Clamp to view range
    const visibleStart = isBefore(checkIn, startDate) ? startDate : checkIn;
    const visibleEnd = isAfter(checkOut, viewEnd) ? viewEnd : checkOut;

    const startOffset = differenceInDays(visibleStart, startDate);
    const duration = differenceInDays(visibleEnd, visibleStart);

    const leftPercent = (startOffset / viewRange) * 100;
    const widthPercent = (duration / viewRange) * 100;

    return { leftPercent, widthPercent };
  };

  const handleTodayClick = () => {
    setStartDate(startOfDay(new Date()));
  };

  const cellWidth = viewRange <= 14 ? "min-w-[60px]" : "min-w-[40px]";

  return (
    <div className="border rounded-lg bg-card">
      <div className="p-4">
        <CalendarHeader
          startDate={startDate}
          viewRange={viewRange}
          onStartDateChange={setStartDate}
          onViewRangeChange={setViewRange}
          onTodayClick={handleTodayClick}
          floorFilter={floorFilter}
          onFloorFilterChange={setFloorFilter}
          floors={floors}
        />
      </div>

      <ScrollArea className="w-full">
        <div className="min-w-max">
          {/* Header Row */}
          <div className="flex border-y bg-muted/50 sticky top-0 z-20">
            <div className="w-[140px] min-w-[140px] px-3 py-2 font-medium text-sm border-r flex-shrink-0">
              Room
            </div>
            <div className="flex flex-1">
              {dateColumns.map((date) => (
                <div
                  key={date.toISOString()}
                  className={cn(
                    "flex-1 px-1 py-2 text-center border-r last:border-r-0",
                    cellWidth,
                    isToday(date) && "bg-primary/10"
                  )}
                >
                  <div className="text-xs font-medium">{format(date, "EEE")}</div>
                  <div
                    className={cn(
                      "text-sm",
                      isToday(date) && "font-bold text-primary"
                    )}
                  >
                    {format(date, "d")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Room Rows */}
          {filteredRooms.map((room) => {
            const roomBookings = getBookingsForRoom(room.id);

            return (
              <div
                key={room.id}
                className={cn(
                  "flex border-b last:border-b-0 hover:bg-accent/30 transition-colors",
                  roomTypeColors[room.type]
                )}
              >
                {/* Room Info */}
                <div className="w-[140px] min-w-[140px] px-3 py-2 border-r flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{room.number}</span>
                    <Badge
                      variant={statusBadgeVariants[room.status] || "outline"}
                      className="text-[10px] h-5 capitalize"
                    >
                      {room.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {room.type} · ${room.price}/night
                  </div>
                </div>

                {/* Booking Grid */}
                <div className="flex flex-1 relative h-14">
                  {/* Date cell backgrounds */}
                  {dateColumns.map((date) => (
                    <div
                      key={date.toISOString()}
                      className={cn(
                        "flex-1 border-r last:border-r-0",
                        cellWidth,
                        isToday(date) && "bg-primary/5"
                      )}
                    />
                  ))}

                  {/* Booking blocks */}
                  {roomBookings.map((booking) => {
                    const { leftPercent, widthPercent } = calculateBlockPosition(booking);
                    const guest = guests.find((g) => g.id === booking.guestId);

                    return (
                      <BookingBlock
                        key={booking.id}
                        booking={booking}
                        guest={guest}
                        leftPercent={leftPercent}
                        widthPercent={widthPercent}
                        onClick={() => onBookingClick(booking)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredRooms.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No rooms found for the selected floor
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Legend */}
      <div className="p-3 border-t bg-muted/30 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded bg-blue-500" />
          <span>Confirmed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded bg-green-500" />
          <span>Checked In</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded bg-muted border" />
          <span>Checked Out</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded bg-red-500/30 border border-red-500/50" />
          <span>Cancelled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded bg-orange-500/30 border border-orange-500/50" />
          <span>No-show</span>
        </div>
      </div>
    </div>
  );
}
