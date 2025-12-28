import { format } from "date-fns";
import { Bell, Check, Clock, Package, Palmtree, User,X } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

import { Trace, TraceType } from "@/types/hotel";

interface TraceCardProps {
  trace: Trace;
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
}

const typeConfig: Record<TraceType, { icon: React.ReactNode; color: string; label: string }> = {
  'reminder': { 
    icon: <Bell className="h-4 w-4" />, 
    color: 'text-amber-500',
    label: 'Reminder'
  },
  'inventory-request': { 
    icon: <Package className="h-4 w-4" />, 
    color: 'text-blue-500',
    label: 'Inventory Request'
  },
  'leisure-booking': { 
    icon: <Palmtree className="h-4 w-4" />, 
    color: 'text-green-500',
    label: 'Leisure Booking'
  },
};

const statusConfig = {
  'pending': { variant: 'secondary' as const, label: 'Pending' },
  'completed': { variant: 'default' as const, label: 'Completed' },
  'cancelled': { variant: 'destructive' as const, label: 'Cancelled' },
};

export function TraceCard({ trace, onComplete, onCancel }: TraceCardProps) {
  const config = typeConfig[trace.type];
  const status = statusConfig[trace.status];
  const isPending = trace.status === 'pending';

  const renderTypeSpecificInfo = () => {
    switch (trace.type) {
      case 'inventory-request':
        return (
          <div className="flex gap-4 text-sm text-muted-foreground">
            {trace.itemName && <span>Item: {trace.itemName}</span>}
            {trace.quantity && <span>Qty: {trace.quantity}</span>}
            {trace.deliveryTime && <span>Delivery: {trace.deliveryTime}</span>}
          </div>
        );
      case 'leisure-booking':
        return (
          <div className="flex gap-4 text-sm text-muted-foreground">
            {trace.activityName && <span>{trace.activityName}</span>}
            {trace.venue && <span>@ {trace.venue}</span>}
            {trace.pax && <span>{trace.pax} pax</span>}
            {trace.confirmationNumber && <span>Conf: {trace.confirmationNumber}</span>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`${!isPending ? 'opacity-60' : ''}`}>
      <CardContent className="py-3 px-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={`mt-0.5 ${config.color}`}>
              {config.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium truncate">{trace.title}</span>
                <Badge variant={status.variant} className="text-xs">
                  {status.label}
                </Badge>
              </div>
              
              {trace.description && (
                <p className="text-sm text-muted-foreground mb-2">{trace.description}</p>
              )}
              
              {renderTypeSpecificInfo()}
              
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                {trace.dueDate && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(new Date(trace.dueDate), 'MMM d, yyyy')}
                    {trace.dueTime && ` at ${trace.dueTime}`}
                  </span>
                )}
                {trace.assignedTo && (
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {trace.assignedTo}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {isPending && (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => onComplete(trace.id)}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                onClick={() => onCancel(trace.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
