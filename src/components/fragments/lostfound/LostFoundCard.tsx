import { CheckCircle, Clock, Edit, Eye, Link, MapPin, Phone,User } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

import { LostFoundItem } from "@/types/hotel";

import { cn } from "@/libs/utils";

interface LostFoundCardProps {
  item: LostFoundItem;
  onView: (item: LostFoundItem) => void;
  onEdit: (item: LostFoundItem) => void;
  onMatch: (item: LostFoundItem) => void;
  onReturn: (item: LostFoundItem) => void;
}

const statusStyles = {
  reported: 'bg-destructive text-destructive-foreground',
  found: 'bg-info text-info-foreground',
  matched: 'bg-warning text-warning-foreground',
  returned: 'bg-success text-success-foreground',
  disposed: 'bg-muted text-muted-foreground',
};

const typeStyles = {
  lost: 'border-destructive/30 bg-destructive/5',
  found: 'border-info/30 bg-info/5',
};

const categoryIcons = {
  electronics: '📱',
  jewelry: '💍',
  clothing: '👕',
  documents: '📄',
  bags: '👜',
  keys: '🔑',
  other: '📦',
};

export function LostFoundCard({ item, onView, onEdit, onMatch, onReturn }: LostFoundCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className={cn("transition-shadow hover:shadow-md", typeStyles[item.type])}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{categoryIcons[item.category]}</span>
            <div>
              <h3 className="font-semibold">{item.itemName}</h3>
              <Badge variant="outline" className="capitalize mt-1">
                {item.type}
              </Badge>
            </div>
          </div>
          <Badge className={cn(statusStyles[item.status])}>
            {item.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
            {item.roomNumber && <span className="text-xs">(Room {item.roomNumber})</span>}
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatDate(item.reportedDate)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{item.reportedBy}</span>
          </div>
          
          {item.contactInfo && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{item.contactInfo}</span>
            </div>
          )}
        </div>

        {item.storageLocation && (
          <div className="text-xs bg-muted/50 p-2 rounded">
            <span className="text-muted-foreground">Storage: </span>
            <span className="font-medium">{item.storageLocation}</span>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(item)}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(item)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          {(item.status === 'reported' || item.status === 'found') && (
            <Button variant="outline" size="sm" onClick={() => onMatch(item)}>
              <Link className="h-4 w-4" />
            </Button>
          )}
          {item.status === 'matched' && (
            <Button variant="default" size="sm" onClick={() => onReturn(item)}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Return
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}