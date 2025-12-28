import { useEffect,useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { HousekeepingStatus,Room, RoomStatus, RoomType } from "@/types/hotel";

import { serviceItems } from "@/data/mock";

interface RoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room?: Room | null;
  onSave: (room: Partial<Room>) => void;
}

const roomTypes: RoomType[] = ['single', 'double', 'suite', 'deluxe'];
const roomStatuses: RoomStatus[] = ['available', 'occupied', 'maintenance', 'cleaning', 'out-of-order', 'house-use', 'complimentary'];
const housekeepingStatuses: HousekeepingStatus[] = ['clean', 'dirty', 'inspected'];

const availableAmenities = [
  'WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Kitchen', 'Ocean View', 
  'Safe', 'Coffee Machine', 'Hair Dryer', 'Iron', 'Desk', 'Sofa', 'Bathtub'
];

export function RoomDialog({ open, onOpenChange, room, onSave }: RoomDialogProps) {
  const [formData, setFormData] = useState({
    number: '',
    type: 'single' as RoomType,
    floor: 1,
    price: 89,
    status: 'available' as RoomStatus,
    housekeepingStatus: 'clean' as HousekeepingStatus,
    capacity: 1,
    amenities: ['WiFi', 'TV', 'AC'] as string[],
    availableServices: [] as string[],
  });

  useEffect(() => {
    if (room) {
      setFormData({
        number: room.number,
        type: room.type,
        floor: room.floor,
        price: room.price,
        status: room.status,
        housekeepingStatus: room.housekeepingStatus || 'clean',
        capacity: room.capacity,
        amenities: room.amenities || ['WiFi', 'TV', 'AC'],
        availableServices: room.availableServices || [],
      });
    } else {
      setFormData({
        number: '',
        type: 'single',
        floor: 1,
        price: 89,
        status: 'available',
        housekeepingStatus: 'clean',
        capacity: 1,
        amenities: ['WiFi', 'TV', 'AC'],
        availableServices: [],
      });
    }
  }, [room]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: room?.id });
    onOpenChange(false);
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      availableServices: prev.availableServices.includes(serviceId)
        ? prev.availableServices.filter(s => s !== serviceId)
        : [...prev.availableServices, serviceId]
    }));
  };

  const selectAllServices = () => {
    setFormData(prev => ({
      ...prev,
      availableServices: serviceItems.filter(s => s.isActive).map(s => s.id)
    }));
  };

  const clearAllServices = () => {
    setFormData(prev => ({
      ...prev,
      availableServices: []
    }));
  };

  // Group services by category
  const servicesByCategory = serviceItems.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof serviceItems>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{room ? 'Edit Room' : 'Add New Room'}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 max-h-[calc(90vh-160px)] pr-4">
          <form id="room-form" onSubmit={handleSubmit} className="space-y-6 pb-2">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Room Number</Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="101"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">Floor</Label>
                <Input
                  id="floor"
                  type="number"
                  min={1}
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Room Type</Label>
                <Select value={formData.type} onValueChange={(value: RoomType) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: RoomStatus) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomStatuses.map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">{status.replace('-', ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price per Night ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min={1}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  min={1}
                  max={10}
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="housekeeping">Housekeeping</Label>
                <Select value={formData.housekeepingStatus} onValueChange={(value: HousekeepingStatus) => setFormData({ ...formData, housekeepingStatus: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {housekeepingStatuses.map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label>Room Amenities</Label>
              <div className="flex flex-wrap gap-2">
                {availableAmenities.map((amenity) => (
                  <Badge
                    key={amenity}
                    variant={formData.amenities.includes(amenity) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Available Services */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Available Services</Label>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={selectAllServices}>
                    Select All
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={clearAllServices}>
                    Clear All
                  </Button>
                </div>
              </div>
              <div className="space-y-4 border rounded-lg p-4">
                {Object.entries(servicesByCategory).map(([category, services]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="text-sm font-medium capitalize text-muted-foreground">{category}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {services.filter(s => s.isActive).map((service) => (
                        <div key={service.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`service-${service.id}`}
                            checked={formData.availableServices.includes(service.id)}
                            onCheckedChange={() => toggleService(service.id)}
                          />
                          <label
                            htmlFor={`service-${service.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {service.name} (${service.price})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </ScrollArea>
        
        {/* Fixed Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="room-form">
            {room ? 'Save Changes' : 'Add Room'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
