import { CheckCircle, Edit, Eye, Link, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

import { LostFoundItem } from "@/types/hotel";

import { cn } from "@/libs/utils";

interface LostFoundTableProps {
  items: LostFoundItem[];
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
  lost: 'bg-destructive/10 text-destructive border-destructive/20',
  found: 'bg-info/10 text-info border-info/20',
};

const categoryLabels = {
  electronics: 'Electronics',
  jewelry: 'Jewelry',
  clothing: 'Clothing',
  documents: 'Documents',
  bags: 'Bags',
  keys: 'Keys',
  other: 'Other',
};

export function LostFoundTable({ items, onView, onEdit, onMatch, onReturn }: LostFoundTableProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="rounded-xl border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No items found
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", typeStyles[item.type])}>
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{item.itemName}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {item.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{categoryLabels[item.category]}</TableCell>
                <TableCell>
                  <div>
                    <div>{item.location}</div>
                    {item.roomNumber && (
                      <div className="text-xs text-muted-foreground">Room {item.roomNumber}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{formatDate(item.reportedDate)}</TableCell>
                <TableCell>{item.reportedBy}</TableCell>
                <TableCell>
                  <Badge className={cn(statusStyles[item.status])}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onView(item)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    {(item.status === 'reported' || item.status === 'found') && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMatch(item)}>
                        <Link className="h-4 w-4" />
                      </Button>
                    )}
                    {item.status === 'matched' && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-success" onClick={() => onReturn(item)}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}