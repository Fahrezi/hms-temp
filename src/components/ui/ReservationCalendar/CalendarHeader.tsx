import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { format, addDays } from "date-fns";
import { Button } from "../Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select";

export type ViewRange = 7 | 14 | 30;

interface CalendarHeaderProps {
  startDate: Date;
  viewRange: ViewRange;
  onStartDateChange: (date: Date) => void;
  onViewRangeChange: (range: ViewRange) => void;
  onTodayClick: () => void;
  floorFilter: string;
  onFloorFilterChange: (floor: string) => void;
  floors: number[];
}

export function CalendarHeader({
  startDate,
  viewRange,
  onStartDateChange,
  onViewRangeChange,
  onTodayClick,
  floorFilter,
  onFloorFilterChange,
  floors,
}: CalendarHeaderProps) {
  const endDate = addDays(startDate, viewRange - 1);

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pb-4 border-b">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">
          {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Button variant="outline" size="sm" onClick={onTodayClick}>
          Today
        </Button>

        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onStartDateChange(addDays(startDate, -viewRange))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onStartDateChange(addDays(startDate, viewRange))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Select
          value={String(viewRange)}
          onValueChange={(val) => onViewRangeChange(Number(val) as ViewRange)}
        >
          <SelectTrigger className="w-[100px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 Days</SelectItem>
            <SelectItem value="14">14 Days</SelectItem>
            <SelectItem value="30">30 Days</SelectItem>
          </SelectContent>
        </Select>

        <Select value={floorFilter} onValueChange={onFloorFilterChange}>
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue placeholder="All Floors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Floors</SelectItem>
            {floors.map((floor) => (
              <SelectItem key={floor} value={String(floor)}>
                Floor {floor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
