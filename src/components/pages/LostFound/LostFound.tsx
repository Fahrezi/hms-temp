import { AlertTriangle, CheckCircle, Link, Package, Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { KPI as StatCard } from "@/components/fragments/dashboard/Kpi";
import { LostFoundCard } from "@/components/fragments/lostfound/LostFoundCard";
import { LostFoundDialog } from "@/components/fragments/lostfound/LostFoundDialog";
import { LostFoundTable } from "@/components/fragments/lostfound/LostFoundTable";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { ViewMode, ViewToggle } from "@/components/ui/ViewToggle";

import { LostFoundCategory, LostFoundItem, LostFoundStatus, LostFoundType } from "@/types/hotel";

import { lostFoundItems as initialItems } from "@/data/mock";

export default function LostFound() {
  const [items, setItems] = useState<LostFoundItem[]>(initialItems);
  const [view, setView] = useState<ViewMode>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | LostFoundType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | LostFoundStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | LostFoundCategory>("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);

  // Calculate stats
  const stats = {
    total: items.length,
    pending: items.filter(i => i.status === 'reported' || i.status === 'found').length,
    matched: items.filter(i => i.status === 'matched').length,
    returned: items.filter(i => i.status === 'returned').length,
  };

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const handleView = (item: LostFoundItem) => {
    setSelectedItem(item);
    setDialogMode('view');
    setDialogOpen(true);
  };

  const handleEdit = (item: LostFoundItem) => {
    setSelectedItem(item);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setDialogMode('add');
    setDialogOpen(true);
  };

  const handleMatch = (item: LostFoundItem) => {
    toast.info(`Match feature for "${item.itemName}" - Coming soon!`);
  };

  const handleReturn = (item: LostFoundItem) => {
    setItems(items.map(i =>
      i.id === item.id
        ? { ...i, status: 'returned' as LostFoundStatus, returnedDate: new Date().toISOString() }
        : i
    ));
    toast.success(`"${item.itemName}" marked as returned!`);
  };

  const handleSave = (formData: Partial<LostFoundItem>) => {
    if (dialogMode === 'add') {
      const newItem: LostFoundItem = {
        id: `lf${Date.now()}`,
        type: formData.type || 'lost',
        status: formData.type === 'lost' ? 'reported' : 'found',
        category: formData.category || 'other',
        itemName: formData.itemName || '',
        description: formData.description || '',
        location: formData.location || '',
        reportedDate: new Date().toISOString(),
        reportedBy: formData.reportedBy || '',
        roomNumber: formData.roomNumber,
        contactInfo: formData.contactInfo,
        storageLocation: formData.storageLocation,
        notes: formData.notes,
      };
      setItems([newItem, ...items]);
      toast.success(`Item "${newItem.itemName}" added successfully!`);
    } else if (dialogMode === 'edit' && selectedItem) {
      setItems(items.map(i =>
        i.id === selectedItem.id ? { ...i, ...formData } : i
      ));
      toast.success(`Item "${formData.itemName}" updated!`);
    }
  };

  return (
    <div>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Items" value={stats.total} icon={Package} tone="primary" />
          <StatCard title="Pending" value={stats.pending} icon={AlertTriangle} tone="warning" />
          <StatCard title="Matched" value={stats.matched} icon={Link} tone="info" />
          <StatCard title="Returned" value={stats.returned} icon={CheckCircle} tone="success" />
        </div>

        {/* Actions & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Report Item
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[200px]"
              />
            </div>

            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as "all" | LostFoundType)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="found">Found</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as "all" | LostFoundStatus)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="found">Found</SelectItem>
                <SelectItem value="matched">Matched</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="disposed">Disposed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as "all" | LostFoundCategory)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="bags">Bags</SelectItem>
                <SelectItem value="keys">Keys</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <ViewToggle view={view} onViewChange={setView} />
          </div>
        </div>

        {/* Content */}
        {view === "list" ? (
          <LostFoundTable
            items={filteredItems}
            onView={handleView}
            onEdit={handleEdit}
            onMatch={handleMatch}
            onReturn={handleReturn}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <LostFoundCard
                key={item.id}
                item={item}
                onView={handleView}
                onEdit={handleEdit}
                onMatch={handleMatch}
                onReturn={handleReturn}
              />
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No items found matching your filters
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dialog */}
      <LostFoundDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={selectedItem}
        mode={dialogMode}
        onSave={handleSave}
      />
    </div>
  );
}