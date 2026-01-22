import { Booking, Guest } from "@/types/hotel";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../Tooltip";

interface BookingBlockProps {
  booking: Booking;
  guest?: Guest;
  leftPercent: number;
  widthPercent: number;
  onClick: () => void;
}

const statusStyles: Record<string, string> = {
  confirmed: "bg-blue-500/90 hover:bg-blue-500 border-blue-600",
  "checked-in": "bg-green-500/90 hover:bg-green-500 border-green-600",
  "checked-out": "bg-muted hover:bg-muted/80 border-muted-foreground/30 text-muted-foreground",
  cancelled: "bg-red-500/20 hover:bg-red-500/30 border-red-500/50 text-red-700 dark:text-red-400",
  "no-show": "bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/50 text-orange-700 dark:text-orange-400",
};

export function BookingBlock({
  booking,
  guest,
  leftPercent,
  widthPercent,
  onClick,
}: BookingBlockProps) {
  const guestName = guest?.name || "Unknown Guest";
  const isLightText = ["confirmed", "checked-in"].includes(booking.status);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              "absolute top-1 bottom-1 rounded-md border px-2 flex items-center gap-1 text-xs font-medium transition-all cursor-pointer overflow-hidden z-10",
              isLightText && "text-white",
              statusStyles[booking.status] || statusStyles.confirmed
            )}
            style={{
              left: `${leftPercent}%`,
              width: `${Math.max(widthPercent, 3)}%`,
            }}
          >
            <span className="truncate">
              {widthPercent > 10 ? guestName : guestName.split(" ")[0]}
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold">{guestName}</p>
            <p className="text-muted-foreground text-xs">
              {format(new Date(booking.checkIn), "MMM d")} - {format(new Date(booking.checkOut), "MMM d, yyyy")}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="capitalize">{booking.status.replace("-", " ")}</span>
              <span>•</span>
              <span>{booking.type}</span>
              <span>•</span>
              <span>${booking.totalAmount}</span>
            </div>
            {booking.specialRequests && (
              <p className="text-xs text-muted-foreground italic">
                "{booking.specialRequests}"
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
