import { format } from 'date-fns';
import { 
  Banknote,
  Building,
  CheckCircle, 
  Clock, 
  CreditCard,
  DollarSign, 
  Plus, 
  RefreshCcw, 
  Search, 
  Wallet,
  XCircle} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Dialog, DialogContent, DialogFooter,DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Textarea } from '@/components/ui/TextArea';

import { DepositStatus, PaymentMethod } from '@/types/hotel';

import { bookings, deposits, guests, rooms } from '@/data/mock';

const statusConfig: Record<DepositStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ElementType }> = {
  pending: { label: 'Pending', variant: 'outline', icon: Clock },
  received: { label: 'Received', variant: 'secondary', icon: CheckCircle },
  applied: { label: 'Applied', variant: 'default', icon: CheckCircle },
  refunded: { label: 'Refunded', variant: 'outline', icon: RefreshCcw },
  forfeited: { label: 'Forfeited', variant: 'destructive', icon: XCircle },
};

const paymentMethodConfig: Record<PaymentMethod, { label: string; icon: React.ElementType }> = {
  cash: { label: 'Cash', icon: Banknote },
  'credit-card': { label: 'Credit Card', icon: CreditCard },
  'debit-card': { label: 'Debit Card', icon: CreditCard },
  'bank-transfer': { label: 'Bank Transfer', icon: Building },
  online: { label: 'Online', icon: Wallet },
};

export default function Deposits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getGuestName = (guestId: string) => {
    return guests.find(g => g.id === guestId)?.name || 'Unknown Guest';
  };

  const getBookingInfo = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return null;
    const room = rooms.find(r => r.id === booking.roomId);
    return { booking, room };
  };

  const filteredDeposits = deposits.filter(deposit => {
    const guestName = getGuestName(deposit.guestId).toLowerCase();
    const matchesSearch = guestName.includes(searchTerm.toLowerCase()) || 
                          deposit.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || deposit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalReceived = deposits.filter(d => d.status === 'received').reduce((sum, d) => sum + d.amount, 0);
  const totalPending = deposits.filter(d => d.status === 'pending').reduce((sum, d) => sum + d.amount, 0);
  const totalApplied = deposits.filter(d => d.status === 'applied').reduce((sum, d) => sum + d.amount, 0);

  const handleRecordDeposit = () => {
    toast.success('Deposit recorded successfully');
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Deposits</h1>
            <p className="text-muted-foreground">Manage guest deposits and security payments</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Record Deposit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Record New Deposit</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="booking">Booking</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select booking" />
                    </SelectTrigger>
                    <SelectContent>
                      {bookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in').map(booking => {
                        const guest = guests.find(g => g.id === booking.guestId);
                        const room = rooms.find(r => r.id === booking.roomId);
                        return (
                          <SelectItem key={booking.id} value={booking.id}>
                            {guest?.name} - Room {room?.number}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="method">Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(paymentMethodConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <config.icon className="h-4 w-4" />
                            {config.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea name="notes" id="notes" placeholder="Optional notes..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRecordDeposit}>Record Deposit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">${totalPending.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {deposits.filter(d => d.status === 'pending').length} deposits awaiting
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Received</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">${totalReceived.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {deposits.filter(d => d.status === 'received').length} deposits held
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applied</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${totalApplied.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {deposits.filter(d => d.status === 'applied').length} deposits applied
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by guest name or deposit ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Deposits Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeposits.map((deposit) => {
                    const bookingInfo = getBookingInfo(deposit.bookingId);
                    const StatusIcon = statusConfig[deposit.status].icon;
                    const PaymentIcon = paymentMethodConfig[deposit.paymentMethod].icon;
                    
                    return (
                      <TableRow key={deposit.id}>
                        <TableCell className="font-medium">
                          {getGuestName(deposit.guestId)}
                        </TableCell>
                        <TableCell>
                          {bookingInfo?.room ? `Room ${bookingInfo.room.number}` : '-'}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${deposit.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <PaymentIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{paymentMethodConfig[deposit.paymentMethod].label}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusConfig[deposit.status].variant}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[deposit.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {deposit.receivedAt 
                            ? format(new Date(deposit.receivedAt), 'MMM dd, yyyy')
                            : 'Pending'
                          }
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {deposit.status === 'pending' && (
                              <Button size="sm" variant="outline" onClick={() => toast.success('Deposit marked as received')}>
                                Receive
                              </Button>
                            )}
                            {deposit.status === 'received' && (
                              <>
                                <Button size="sm" variant="outline" onClick={() => toast.success('Deposit applied to folio')}>
                                  Apply
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => toast.info('Refund initiated')}>
                                  Refund
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            {filteredDeposits.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                No deposits found matching your criteria
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
