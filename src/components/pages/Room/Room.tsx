import { Plus, Search } from "lucide-react";
import { useEffect,useState } from "react";
import { toast } from "sonner";

import { RoomCard } from "@/components/fragments/rooms/RoomCard";
import { RoomDialog } from "@/components/fragments/rooms/RoomDialog";
import { RoomTable } from "@/components/fragments/rooms/RoomTable";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { ViewMode,ViewToggle } from "@/components/ui/ViewToggle";

import { Room } from "@/types/hotel";

import { rooms as initialRooms } from "@/data/mock";

const VIEW_STORAGE_KEY = "rooms-view-mode";

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return (localStorage.getItem(VIEW_STORAGE_KEY) as ViewMode) || "grid";
  });

  useEffect(() => {
    localStorage.setItem(VIEW_STORAGE_KEY, viewMode);
  }, [viewMode]);

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.includes(search) || room.type.includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSave = (roomData: Partial<Room>) => {
    if (roomData.id) {
      setRooms(rooms.map(r => r.id === roomData.id ? { ...r, ...roomData } as Room : r));
      toast.success("Room updated successfully");
    } else {
      const newRoom = { ...roomData, id: String(rooms.length + 1), amenities: ['WiFi', 'TV', 'AC'] } as Room;
      setRooms([...rooms, newRoom]);
      toast.success("Room added successfully");
    }
  };

  const handleStatusChange = (room: Room, status: Room['status']) => {
    setRooms(rooms.map(r => r.id === room.id ? { ...r, status } : r));
    toast.success(`Room ${room.number} marked as ${status}`);
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search rooms..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-45"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="out-of-order">Out of Order</SelectItem>
                <SelectItem value="house-use">House Use</SelectItem>
                <SelectItem value="complimentary">Complimentary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3">
            <ViewToggle view={viewMode} onViewChange={setViewMode} />
            {/* <Button onClick={() => { setEditingRoom(null); setDialogOpen(true); }}><Plus className="h-4 w-4 mr-2" />Add Room</Button> */}
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRooms.map(room => (
              <RoomCard key={room.id} room={room} onEdit={handleEdit} onStatusChange={handleStatusChange} />
            ))}
          </div>
        ) : (
          <RoomTable rooms={filteredRooms} onEdit={handleEdit} onStatusChange={handleStatusChange} />
        )}
      </div>
      {/* <RoomDialog open={dialogOpen} onOpenChange={setDialogOpen} room={editingRoom} onSave={handleSave} /> */}
    </div>
  );
}
