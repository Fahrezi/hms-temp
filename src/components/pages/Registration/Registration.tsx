import { 
  ArrowLeft,
  BedDouble, 
  Calendar,
  CheckCircle, 
  ClipboardCheck,
  CreditCard, 
  DollarSign,
  FileText,
  Mail,
  Phone,
  User} from "lucide-react";
import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from "sonner";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription,CardHeader, CardTitle } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { Textarea } from "@/components/ui/TextArea";

import { bookings, guests, rooms } from "@/data/mock";

export default function Registration() {
  const params = new URLSearchParams(window.location.search);
  const bookingId = params.get("bookingId");
  const navigate = useNavigate();

  const booking = bookings.find(b => b.id === bookingId);
  const guest = booking ? guests.find(g => g.id === booking.guestId) : null;
  const room = booking ? rooms.find(r => r.id === booking.roomId) : null;

  const [guestData, setGuestData] = useState({
    name: guest?.name || '',
    email: guest?.email || '',
    phone: guest?.phone || '',
    idNumber: guest?.idNumber || '',
    idType: 'passport',
    notes: guest?.notes || '',
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'cash',
    depositAmount: room ? Math.round(room.price * 0.5) : 0,
    depositPaid: false,
    cardLast4: '',
  });

  const [roomPreferences, setRoomPreferences] = useState({
    confirmRoom: false,
    specialRequests: booking?.specialRequests || '',
    extraBed: false,
    earlyCheckIn: false,
    lateCheckOut: false,
  });

  const [guestVerified, setGuestVerified] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [roomVerified, setRoomVerified] = useState(false);

  if (!booking || !guest || !room) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <ClipboardCheck className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Booking Not Found</h2>
          <p className="text-muted-foreground mb-4">The booking you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/reservation')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reservations
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleVerifyGuest = () => {
    if (!guestData.name || !guestData.idNumber || !guestData.phone) {
      toast.error("Please fill in all required guest details.");
      // toast({
      //   title: "Missing Information",
      //   description: "Please fill in all required guest details.",
      //   variant: "destructive",
      // });
      return;
    }
    setGuestVerified(true);
    toast.success("Guest verified successfully");
    // toast({
    //   title: "Guest Verified",
    //   description: "Guest identity has been verified successfully.",
    // });
  };

  const handleVerifyPayment = () => {
    if (!paymentData.depositPaid) {
      toast.error("Please confirm the deposit has been collected.");
      // toast({
      //   title: "Deposit Required",
      //   description: "Please confirm the deposit has been collected.",
      //   variant: "destructive",
      // });
      return;
    }
    setPaymentVerified(true);
    toast.success("Payment and deposit verified");
    // toast({
    //   title: "Payment Confirmed",
    //   description: "Payment and deposit have been verified.",
    // });
  };

  const handleVerifyRoom = () => {
    if (!roomPreferences.confirmRoom) {
      toast.error("Please confirm the room assignment.");
      // toast({
      //   title: "Room Confirmation Required",
      //   description: "Please confirm the room assignment.",
      //   variant: "destructive",
      // });
      return;
    }
    setRoomVerified(true);
    toast.success("Room assigned successfully");
    // toast({
    //   title: "Room Assigned",
    //   description: `Room ${room.number} has been assigned to the guest.`,
    // });
  };

  const handleCompleteRegistration = () => {
    if (!guestVerified || !paymentVerified || !roomVerified) {
      toast.error("Please complete all verification steps before check-in.");
      // toast({
      //   title: "Incomplete Verification",
      //   description: "Please complete all verification steps before check-in.",
      //   variant: "destructive",
      // });
      return;
    }
    toast.success("Check-in complete");
    // toast({
    //   title: "Check-In Complete",
    //   description: `${guest.name} has been checked into Room ${room.number}.`,
    // });
    navigate('/reservation');
  };

  const allVerified = guestVerified && paymentVerified && roomVerified;

  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/reservation')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Reservations
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Registration for Booking #{booking.id}</h2>
            <p className="text-muted-foreground">
              Verify guest details, payment, and room assignment before check-in
            </p>
          </div>
          <Badge variant={booking.type === 'walk-in' ? 'secondary' : 'outline'} className="text-sm">
            {booking.type === 'walk-in' ? 'Walk-in' : 'Reservation'}
          </Badge>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="text-muted-foreground">Check-in</p>
                <p className="font-medium">{formatDate(booking.checkIn)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="text-muted-foreground">Check-out</p>
                <p className="font-medium">{formatDate(booking.checkOut)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4 text-primary" />
              <div>
                <p className="text-muted-foreground">Room</p>
                <p className="font-medium">{room.number} - {room.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <div>
                <p className="text-muted-foreground">Total ({nights} nights)</p>
                <p className="font-medium">${booking.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {/* Guest Verification Section */}
        <Card className={guestVerified ? 'border-success/50' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${guestVerified ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                  {guestVerified ? <CheckCircle className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </div>
                <div>
                  <CardTitle className="text-lg">Guest Identity Verification</CardTitle>
                  <CardDescription>Verify guest ID and contact information</CardDescription>
                </div>
              </div>
              {guestVerified && <Badge className="bg-success text-success-foreground">Verified</Badge>}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name" 
                  value={guestData.name}
                  onChange={(e) => setGuestData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={guestVerified}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idType">ID Type</Label>
                <Select 
                  value={guestData.idType} 
                  onValueChange={(v) => setGuestData(prev => ({ ...prev, idType: v }))}
                  disabled={guestVerified}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="national_id">National ID</SelectItem>
                    <SelectItem value="drivers_license">Driver's License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="idNumber" 
                    className="pl-10"
                    value={guestData.idNumber}
                    onChange={(e) => setGuestData(prev => ({ ...prev, idNumber: e.target.value }))}
                    disabled={guestVerified}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="phone" 
                    className="pl-10"
                    value={guestData.phone}
                    onChange={(e) => setGuestData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={guestVerified}
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email"
                    className="pl-10"
                    value={guestData.email}
                    onChange={(e) => setGuestData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={guestVerified}
                  />
                </div>
              </div>
            </div>
            {!guestVerified && (
              <Button onClick={handleVerifyGuest} className="w-full md:w-auto">
                <CheckCircle className="h-4 w-4 mr-2" />
                Verify Guest Identity
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Payment Verification Section */}
        <Card className={paymentVerified ? 'border-success/50' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${paymentVerified ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                  {paymentVerified ? <CheckCircle className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
                </div>
                <div>
                  <CardTitle className="text-lg">Payment Confirmation</CardTitle>
                  <CardDescription>Verify payment method and collect deposit</CardDescription>
                </div>
              </div>
              {paymentVerified && <Badge className="bg-success text-success-foreground">Confirmed</Badge>}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select 
                  value={paymentData.paymentMethod} 
                  onValueChange={(v) => setPaymentData(prev => ({ ...prev, paymentMethod: v }))}
                  disabled={paymentVerified}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="debit_card">Debit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(paymentData.paymentMethod === 'credit_card' || paymentData.paymentMethod === 'debit_card') && (
                <div className="space-y-2">
                  <Label htmlFor="cardLast4">Card Last 4 Digits</Label>
                  <Input 
                    id="cardLast4" 
                    maxLength={4}
                    placeholder="1234"
                    value={paymentData.cardLast4}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cardLast4: e.target.value }))}
                    disabled={paymentVerified}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="deposit">Deposit Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="deposit" 
                    type="number"
                    className="pl-10"
                    value={paymentData.depositAmount}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, depositAmount: Number(e.target.value) }))}
                    disabled={paymentVerified}
                  />
                </div>
              </div>
              <div className="space-y-2 flex items-end">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="depositPaid"
                    checked={paymentData.depositPaid}
                    onCheckedChange={(checked) => setPaymentData(prev => ({ ...prev, depositPaid: !!checked }))}
                    disabled={paymentVerified}
                  />
                  <Label htmlFor="depositPaid" className="cursor-pointer">
                    Deposit collected
                  </Label>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-semibold">${booking.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-muted-foreground">Deposit</span>
                <span className="font-semibold">${paymentData.depositAmount.toLocaleString()}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center">
                <span className="font-medium">Balance Due at Checkout</span>
                <span className="font-bold text-lg">${(booking.totalAmount - paymentData.depositAmount).toLocaleString()}</span>
              </div>
            </div>
            
            {!paymentVerified && (
              <Button onClick={handleVerifyPayment} className="w-full md:w-auto">
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm Payment
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Room Assignment Section */}
        <Card className={roomVerified ? 'border-success/50' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${roomVerified ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                  {roomVerified ? <CheckCircle className="h-5 w-5" /> : <BedDouble className="h-5 w-5" />}
                </div>
                <div>
                  <CardTitle className="text-lg">Room Assignment</CardTitle>
                  <CardDescription>Confirm room and special requests</CardDescription>
                </div>
              </div>
              {roomVerified && <Badge className="bg-success text-success-foreground">Assigned</Badge>}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-lg">Room {room.number}</h4>
                  <p className="text-muted-foreground capitalize">{room.type} - Floor {room.floor}</p>
                </div>
                <Badge variant="outline" className="capitalize">{room.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">{amenity}</Badge>
                ))}
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                Capacity: {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'} • ${room.price}/night
              </div>
            </div>

            <div className="space-y-3">
              <Label>Additional Preferences</Label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="extraBed"
                    checked={roomPreferences.extraBed}
                    onCheckedChange={(checked) => setRoomPreferences(prev => ({ ...prev, extraBed: !!checked }))}
                    disabled={roomVerified}
                  />
                  <Label htmlFor="extraBed" className="cursor-pointer font-normal">Extra bed required</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="earlyCheckIn"
                    checked={roomPreferences.earlyCheckIn}
                    onCheckedChange={(checked) => setRoomPreferences(prev => ({ ...prev, earlyCheckIn: !!checked }))}
                    disabled={roomVerified}
                  />
                  <Label htmlFor="earlyCheckIn" className="cursor-pointer font-normal">Early check-in (subject to availability)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="lateCheckOut"
                    checked={roomPreferences.lateCheckOut}
                    onCheckedChange={(checked) => setRoomPreferences(prev => ({ ...prev, lateCheckOut: !!checked }))}
                    disabled={roomVerified}
                  />
                  <Label htmlFor="lateCheckOut" className="cursor-pointer font-normal">Late check-out request</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea 
                name="specialRequests"
                id="specialRequests"
                placeholder="Any additional requests or notes..."
                value={roomPreferences.specialRequests}
                onChange={(e) => setRoomPreferences(prev => ({ ...prev, specialRequests: e.target.value }))}
                disabled={roomVerified}
              />
            </div>

            <div className="flex items-center gap-2 p-3 border rounded-lg bg-card">
              <Checkbox 
                id="confirmRoom"
                checked={roomPreferences.confirmRoom}
                onCheckedChange={(checked) => setRoomPreferences(prev => ({ ...prev, confirmRoom: !!checked }))}
                disabled={roomVerified}
              />
              <Label htmlFor="confirmRoom" className="cursor-pointer">
                I confirm that Room {room.number} is ready and assigned to this guest
              </Label>
            </div>

            {!roomVerified && (
              <Button onClick={handleVerifyRoom} className="w-full md:w-auto">
                <CheckCircle className="h-4 w-4 mr-2" />
                Assign Room
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Complete Registration */}
        <Card className={allVerified ? 'border-success bg-success/5' : 'border-dashed'}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${allVerified ? 'bg-success/10' : 'bg-muted'}`}>
                  <ClipboardCheck className={`h-6 w-6 ${allVerified ? 'text-success' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Complete Check-In</h3>
                  <p className="text-muted-foreground text-sm">
                    {allVerified 
                      ? 'All verification steps completed. Ready to check-in.' 
                      : `${[!guestVerified && 'Guest', !paymentVerified && 'Payment', !roomVerified && 'Room'].filter(Boolean).join(', ')} verification pending`
                    }
                  </p>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={handleCompleteRegistration}
                disabled={!allVerified}
                className="w-full md:w-auto"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Check-In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}