import { format, subDays } from 'date-fns';
import { CalendarIcon, CreditCard,DollarSign, Download, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

import { bookings, deposits, folios, guests, rooms, serviceItems } from '@/data/mock';
import { downloadPDF,generateReportPDF } from '@/libs/pdfGenerator';
import { cn } from '@/libs/utils';

export default function Reports() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const totalRevenue = folios.reduce((sum, f) => sum + f.totalCharges, 0);
  const totalDeposits = deposits.filter(d => d.status === 'received' || d.status === 'applied').reduce((sum, d) => sum + d.amount, 0);
  const outstandingBalance = folios.filter(f => f.status === 'open').reduce((sum, f) => sum + f.balance, 0);

  const handleExportPDF = (reportType: string) => {
    let doc;
    const options = { title: '', dateRange };

    switch (reportType) {
      case 'revenue':
        options.title = 'Daily Revenue Report';
        doc = generateReportPDF(
          options,
          [{ header: 'Date', dataKey: 'date' }, { header: 'Room Revenue', dataKey: 'room' }, { header: 'Services', dataKey: 'services' }, { header: 'Total', dataKey: 'total' }],
          [{ date: format(new Date(), 'MMM dd, yyyy'), room: '$2,450', services: '$385', total: '$2,835' }],
          [{ label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}` }]
        );
        break;
      case 'deposits':
        options.title = 'Deposit Summary Report';
        doc = generateReportPDF(
          options,
          [{ header: 'Guest', dataKey: 'guest' }, { header: 'Status', dataKey: 'status' }, { header: 'Amount', dataKey: 'amount' }],
          deposits.map(d => ({ guest: guests.find(g => g.id === d.guestId)?.name || '', status: d.status, amount: `$${d.amount}` })),
          [{ label: 'Total Deposits', value: `$${totalDeposits.toLocaleString()}` }]
        );
        break;
      case 'outstanding':
        options.title = 'Outstanding Balances Report';
        doc = generateReportPDF(
          options,
          [{ header: 'Guest', dataKey: 'guest' }, { header: 'Room', dataKey: 'room' }, { header: 'Balance', dataKey: 'balance' }],
          folios.filter(f => f.balance > 0).map(f => ({
            guest: guests.find(g => g.id === f.guestId)?.name || '',
            room: rooms.find(r => r.id === f.roomId)?.number || '',
            balance: `$${f.balance}`,
          })),
          [{ label: 'Total Outstanding', value: `$${outstandingBalance.toLocaleString()}` }]
        );
        break;
      default:
        return;
    }

    if (doc) {
      downloadPDF(doc, `${reportType}_report`);
      toast.success('Report exported successfully');
    }
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Financial Reports</h1>
            <p className="text-muted-foreground">Generate and export financial reports</p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("justify-start text-left font-normal")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(dateRange.from, 'MMM dd')} - {format(dateRange.to, 'MMM dd, yyyy')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="range" selected={dateRange} onSelect={(range) => range?.from && range?.to && setDateRange({ from: range.from, to: range.to })} numberOfMonths={2} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Total Revenue</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Deposits Held</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-info">${totalDeposits.toLocaleString()}</p></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Outstanding</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-destructive">${outstandingBalance.toLocaleString()}</p></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Active Folios</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{folios.filter(f => f.status === 'open').length}</p></CardContent></Card>
        </div>

        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="deposits">Deposits</TabsTrigger>
            <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Revenue Report</CardTitle>
                <Button onClick={() => handleExportPDF('revenue')}><Download className="h-4 w-4 mr-2" />Export PDF</Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl overflow-auto">
                  <Table>
                    <TableHeader><TableRow><TableHead>Category</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                    <TableBody>
                      <TableRow><TableCell>Room Charges</TableCell><TableCell className="text-right font-semibold">${folios.reduce((sum, f) => sum + f.transactions.filter(t => t.category === 'room').reduce((s, t) => s + t.amount, 0), 0).toLocaleString()}</TableCell></TableRow>
                      <TableRow><TableCell>Restaurant</TableCell><TableCell className="text-right font-semibold">${folios.reduce((sum, f) => sum + f.transactions.filter(t => t.category === 'restaurant').reduce((s, t) => s + t.amount, 0), 0).toLocaleString()}</TableCell></TableRow>
                      <TableRow><TableCell>Spa & Services</TableCell><TableCell className="text-right font-semibold">${folios.reduce((sum, f) => sum + f.transactions.filter(t => t.category === 'spa').reduce((s, t) => s + t.amount, 0), 0).toLocaleString()}</TableCell></TableRow>
                      <TableRow><TableCell>Other</TableCell><TableCell className="text-right font-semibold">${folios.reduce((sum, f) => sum + f.transactions.filter(t => !['room', 'restaurant', 'spa'].includes(t.category || '')).reduce((s, t) => s + Math.max(0, t.amount), 0), 0).toLocaleString()}</TableCell></TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deposits">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Deposit Summary</CardTitle>
                <Button onClick={() => handleExportPDF('deposits')}><Download className="h-4 w-4 mr-2" />Export PDF</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Guest</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {deposits.slice(0, 5).map(d => (
                      <TableRow key={d.id}><TableCell>{guests.find(g => g.id === d.guestId)?.name}</TableCell><TableCell className="capitalize">{d.status}</TableCell><TableCell className="text-right font-semibold">${d.amount}</TableCell></TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outstanding">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Outstanding Balances</CardTitle>
                <Button onClick={() => handleExportPDF('outstanding')}><Download className="h-4 w-4 mr-2" />Export PDF</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Guest</TableHead><TableHead>Room</TableHead><TableHead className="text-right">Balance</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {folios.filter(f => f.balance > 0).map(f => (
                      <TableRow key={f.id}><TableCell>{guests.find(g => g.id === f.guestId)?.name}</TableCell><TableCell>Room {rooms.find(r => r.id === f.roomId)?.number}</TableCell><TableCell className="text-right font-semibold text-destructive">${f.balance}</TableCell></TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
