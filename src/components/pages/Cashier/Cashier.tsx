import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/Dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Separator } from '@/components/ui/Separator';
import { 
  Search, 
  Plus, 
  CreditCard, 
  Banknote,
  Receipt,
  FileText,
  DollarSign,
  User,
  BedDouble,
  ShoppingCart,
  UtensilsCrossed,
  Wine,
  Sparkles,
  Shirt,
  Car,
  ArrowLeft
} from 'lucide-react';
import { folios, guests, rooms, bookings, serviceItems, folioTransactions } from '@/data/mock';
import { ServiceCategory, PaymentMethod, FolioTransaction } from '@/types/hotel';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { generateReceiptPDF, downloadPDF } from '@/lib/pdfGenerator';

const categoryIcons: Record<ServiceCategory, React.ElementType> = {
  room: BedDouble,
  restaurant: UtensilsCrossed,
  minibar: Wine,
  spa: Sparkles,
  laundry: Shirt,
  parking: Car,
  other: ShoppingCart,
};

const categoryColors: Record<ServiceCategory, string> = {
  room: 'text-primary',
  restaurant: 'text-warning',
  minibar: 'text-info',
  spa: 'text-success',
  laundry: 'text-secondary-foreground',
  parking: 'text-muted-foreground',
  other: 'text-foreground',
};

export default function Cashier() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const folioIdParam = searchParams.get('folioId');
  const guestIdParam = searchParams.get('guestId');
  const fromPage = searchParams.get('from');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolioId, setSelectedFolioId] = useState<string | null>(null);
  const [isChargeDialogOpen, setIsChargeDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  // Auto-select folio based on URL params
  useEffect(() => {
    if (folioIdParam) {
      const folio = folios.find(f => f.id === folioIdParam);
      if (folio) {
        setSelectedFolioId(folioIdParam);
        return;
      }
    }
    if (guestIdParam) {
      const folio = folios.find(f => f.guestId === guestIdParam && f.status === 'open');
      if (folio) {
        setSelectedFolioId(folio.id);
        return;
      }
    }
    // Default to first folio if no params
    if (!selectedFolioId && folios.length > 0) {
      setSelectedFolioId(folios[0].id);
    }
  }, [folioIdParam, guestIdParam]);

  const selectedFolio = folios.find(f => f.id === selectedFolioId);
  const guest = selectedFolio ? guests.find(g => g.id === selectedFolio.guestId) : null;
  const room = selectedFolio ? rooms.find(r => r.id === selectedFolio.roomId) : null;
  const booking = selectedFolio ? bookings.find(b => b.id === selectedFolio.bookingId) : null;

  const filteredFolios = folios.filter(folio => {
    const guestName = guests.find(g => g.id === folio.guestId)?.name.toLowerCase() || '';
    const roomNum = rooms.find(r => r.id === folio.roomId)?.number || '';
    return guestName.includes(searchTerm.toLowerCase()) || roomNum.includes(searchTerm);
  });

  const filteredServices = serviceItems.filter(service => 
    service.isActive && (selectedCategory === 'all' || service.category === selectedCategory)
  );

  const handleAddCharge = (serviceId: string) => {
    const service = serviceItems.find(s => s.id === serviceId);
    if (service) {
      toast.success(`Added ${service.name} - $${service.price}`);
    }
    setIsChargeDialogOpen(false);
  };

  const handlePayment = (method: PaymentMethod) => {
    toast.success(`Payment of $${selectedFolio?.balance} recorded via ${method}`);
    setIsPaymentDialogOpen(false);
  };

  const handlePrintReceipt = () => {
    if (!selectedFolio || !guest || !room || !booking) return;

    const transactions = folioTransactions.filter(t => t.folioId === selectedFolio.id);
    
    const doc = generateReceiptPDF({
      guestName: guest.name,
      roomNumber: room.number,
      checkIn: format(new Date(booking.checkIn), 'MMM dd, yyyy'),
      checkOut: format(new Date(booking.checkOut), 'MMM dd, yyyy'),
      items: transactions.map(t => ({
        description: t.description,
        amount: t.amount,
      })),
      subtotal: selectedFolio.totalCharges,
      tax: selectedFolio.totalCharges * 0.1,
      total: selectedFolio.totalCharges * 1.1,
      paymentMethod: 'Pending',
    });

    downloadPDF(doc, `receipt_${guest.name.replace(/\s+/g, '_')}`);
    toast.success('Receipt generated');
  };

  const handleBack = () => {
    if (fromPage) {
      navigate(fromPage);
    } else {
      navigate(-1);
    }
  };

  return (
    <div>
      {/* Back Navigation */}
      {(folioIdParam || guestIdParam) && (
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
        {/* Left Panel - Folio Selection */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Active Folios</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search guest or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-1 p-2">
                {filteredFolios.map((folio) => {
                  const folioGuest = guests.find(g => g.id === folio.guestId);
                  const folioRoom = rooms.find(r => r.id === folio.roomId);
                  const isSelected = folio.id === selectedFolioId;

                  return (
                    <button
                      key={folio.id}
                      onClick={() => setSelectedFolioId(folio.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${isSelected ? 'bg-primary-foreground/20' : 'bg-muted'}`}>
                            <User className={`h-4 w-4 ${isSelected ? '' : 'text-muted-foreground'}`} />
                          </div>
                          <div>
                            <p className="font-medium">{folioGuest?.name}</p>
                            <p className={`text-sm ${isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              Room {folioRoom?.number}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${folio.balance > 0 ? (isSelected ? '' : 'text-destructive') : ''}`}>
                            ${folio.balance.toLocaleString()}
                          </p>
                          <Badge 
                            variant={folio.status === 'open' ? 'secondary' : 'default'}
                            className={isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : ''}
                          >
                            {folio.status}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Panel - Folio Details */}
        <Card className="lg:col-span-2">
          {selectedFolio ? (
            <>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {guest?.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <BedDouble className="h-4 w-4" />
                        Room {room?.number}
                      </span>
                      {booking && (
                        <span>
                          {format(new Date(booking.checkIn), 'MMM dd')} - {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Balance Due</p>
                    <p className={`text-2xl font-bold ${selectedFolio.balance > 0 ? 'text-destructive' : 'text-success'}`}>
                      ${selectedFolio.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="transactions" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <TabsList>
                      <TabsTrigger value="transactions">Transactions</TabsTrigger>
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2">
                      <Dialog open={isChargeDialogOpen} onOpenChange={setIsChargeDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Charge
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Add Charge</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex gap-2 flex-wrap">
                              <Button 
                                variant={selectedCategory === 'all' ? 'default' : 'outline'} 
                                size="sm"
                                onClick={() => setSelectedCategory('all')}
                              >
                                All
                              </Button>
                              {Object.entries(categoryIcons).map(([key, Icon]) => (
                                <Button 
                                  key={key}
                                  variant={selectedCategory === key ? 'default' : 'outline'} 
                                  size="sm"
                                  onClick={() => setSelectedCategory(key as ServiceCategory)}
                                >
                                  <Icon className="h-4 w-4 mr-1" />
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </Button>
                              ))}
                            </div>
                            <ScrollArea className="h-[300px]">
                              <div className="grid grid-cols-2 gap-2">
                                {filteredServices.map((service) => {
                                  const Icon = categoryIcons[service.category];
                                  return (
                                    <button
                                      key={service.id}
                                      onClick={() => handleAddCharge(service.id)}
                                      className="p-3 text-left rounded-lg border hover:bg-accent transition-colors"
                                    >
                                      <div className="flex items-start gap-2">
                                        <Icon className={`h-5 w-5 mt-0.5 ${categoryColors[service.category]}`} />
                                        <div className="flex-1 min-w-0">
                                          <p className="font-medium truncate">{service.name}</p>
                                          <p className="text-sm text-muted-foreground truncate">
                                            {service.description}
                                          </p>
                                        </div>
                                        <p className="font-semibold">${service.price}</p>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </ScrollArea>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Payment
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Process Payment</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Amount Due</p>
                              <p className="text-3xl font-bold">${selectedFolio.balance.toLocaleString()}</p>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-3">
                              <Button 
                                variant="outline" 
                                className="h-20 flex-col"
                                onClick={() => handlePayment('cash')}
                              >
                                <Banknote className="h-6 w-6 mb-2" />
                                Cash
                              </Button>
                              <Button 
                                variant="outline" 
                                className="h-20 flex-col"
                                onClick={() => handlePayment('credit-card')}
                              >
                                <CreditCard className="h-6 w-6 mb-2" />
                                Credit Card
                              </Button>
                              <Button 
                                variant="outline" 
                                className="h-20 flex-col"
                                onClick={() => handlePayment('debit-card')}
                              >
                                <CreditCard className="h-6 w-6 mb-2" />
                                Debit Card
                              </Button>
                              <Button 
                                variant="outline" 
                                className="h-20 flex-col opacity-50"
                                disabled
                              >
                                <FileText className="h-6 w-6 mb-2" />
                                Stripe (Soon)
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button variant="ghost" size="sm" onClick={handlePrintReceipt}>
                        <Receipt className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </div>

                  <TabsContent value="transactions" className="m-0">
                    <ScrollArea className="h-[calc(100vh-24rem)] rounded-xl">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedFolio.transactions.map((transaction) => {
                            const Icon = transaction.category ? categoryIcons[transaction.category] : FileText;
                            const isCredit = transaction.amount < 0;
                            
                            return (
                              <TableRow key={transaction.id}>
                                <TableCell className="text-muted-foreground">
                                  {format(new Date(transaction.createdAt), 'MMM dd, HH:mm')}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {transaction.description}
                                </TableCell>
                                <TableCell>
                                  {transaction.category && (
                                    <div className="flex items-center gap-2">
                                      <Icon className={`h-4 w-4 ${categoryColors[transaction.category]}`} />
                                      <span className="text-sm capitalize">{transaction.category}</span>
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell className={`text-right font-semibold ${isCredit ? 'text-success' : ''}`}>
                                  {isCredit ? '' : '+'}${Math.abs(transaction.amount).toLocaleString()}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="summary" className="m-0">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Charges</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold">${selectedFolio.totalCharges.toLocaleString()}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold text-success">${selectedFolio.totalPayments.toLocaleString()}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <span className="text-lg font-medium">Balance Due</span>
                        <span className={`text-2xl font-bold ${selectedFolio.balance > 0 ? 'text-destructive' : 'text-success'}`}>
                          ${selectedFolio.balance.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a folio to view details</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
