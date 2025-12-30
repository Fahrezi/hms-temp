import { LayoutGrid, List } from "lucide-react";

import { Button } from "@/components/ui/Button";

import { cn } from "@/libs/utils";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ view, onViewChange, className }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center py-0 rounded-md", className)}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-3 rounded-r-none bg-muted",
          view === "grid" && "bg-white"
        )}
        onClick={() => onViewChange("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-3 rounded-l-none bg-muted",
          view === "list" && "bg-white"
        )}
        onClick={() => onViewChange("list")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
