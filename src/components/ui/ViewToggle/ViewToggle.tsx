import { LayoutGrid, List, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../Button";

export type ViewMode = "grid" | "list" | "calendar";

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  className?: string;
  showCalendar?: boolean;
}

export function ViewToggle({ view, onViewChange, className, showCalendar = false }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center border rounded-md", className)}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-3 rounded-r-none",
          view === "grid" && "bg-muted"
        )}
        onClick={() => onViewChange("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-3 rounded-none border-x",
          view === "list" && "bg-muted"
        )}
        onClick={() => onViewChange("list")}
      >
        <List className="h-4 w-4" />
      </Button>
      {showCalendar && (
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 px-3 rounded-l-none",
            view === "calendar" && "bg-muted"
          )}
          onClick={() => onViewChange("calendar")}
        >
          <CalendarDays className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
