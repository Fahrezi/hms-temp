import { eachDayOfInterval, eachMonthOfInterval,endOfMonth, endOfYear, format, startOfMonth, startOfYear } from "date-fns";
import { 
  AlertCircle,
  ArrowDownUp,
  BedDouble,
  Calendar, 
  CalendarDays,
  CalendarRange,
  CheckCircle2, 
  Clock,
  DollarSign,
  Download, 
  Moon, 
  PlayCircle, 
  Sparkles} from "lucide-react";
import { useMemo,useState } from "react";
import toast from "react-hot-toast";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Calendar as CalendarPicker } from "@/components/ui/Calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Progress } from "@/components/ui/Progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import { AuditPeriod, NightAuditReport, NightAuditStatus, PeriodBreakdownRow } from "@/types/hotel";

import { bookings, deposits, folios, folioTransactions,guests, rooms } from "@/data/mock";
import { downloadPDF,generateNightAuditPDF } from "@/lib/pdfGenerator";

const NightAudit = () => {
  const [businessDate, setBusinessDate] = useState<Date>(new Date());
  const [auditStatus, setAuditStatus] = useState<NightAuditStatus>("open");
  const [periodType, setPeriodType] = useState<AuditPeriod>("daily");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

  // Get date range based on period type
  const getDateRange = useMemo(() => {
    switch (periodType) {
      case 'daily':
        return { start: businessDate, end: businessDate };
      case 'monthly':
        const monthStart = startOfMonth(new Date(selectedYear, selectedMonth));
        const monthEnd = endOfMonth(new Date(selectedYear, selectedMonth));
        return { start: monthStart, end: monthEnd };
      case 'yearly':
        const yearStart = startOfYear(new Date(selectedYear, 0));
        const yearEnd = endOfYear(new Date(selectedYear, 0));
        return { start: yearStart, end: yearEnd };
    }
  }, [periodType, businessDate, selectedYear, selectedMonth]);

  // Generate mock data for date range (simulates historical data)
  const generateMockDataForDate = (date: Date) => {
    // Use date as seed for consistent mock data
    const seed = date.getTime();
    const random = (min: number, max: number) => {
      const x = Math.sin(seed + min * max) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    };

    const occupiedRooms = random(3, 10);
    const totalRooms = 12;
    const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);
    
    return {
      occupancyRate,
      occupiedRooms,
      arrivals: random(1, 5),
      departures: random(1, 4),
      roomRevenue: random(800, 3500),
      fbRevenue: random(100, 500),
      servicesRevenue: random(50, 300),
    };
  };

  // Calculate room statistics
  const calculateRoomStats = () => {
    if (periodType === 'daily') {
      const totalRooms = rooms.length;
      const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
      const availableRooms = rooms.filter(r => r.status === 'available').length;
      const outOfOrder = rooms.filter(r => r.status === 'out-of-order').length;
      const maintenance = rooms.filter(r => r.status === 'maintenance').length;
      const houseUse = rooms.filter(r => r.status === 'house-use').length;
      const complimentary = rooms.filter(r => r.status === 'complimentary').length;
      const occupancyRate = Math.round((occupiedRooms / (totalRooms - outOfOrder - maintenance)) * 100);

      return {
        totalRooms,
        occupiedRooms,
        availableRooms,
        outOfOrder,
        maintenance,
        houseUse,
        complimentary,
        occupancyRate
      };
    } else {
      // For monthly/yearly, calculate averages
      const days = periodType === 'monthly' 
        ? eachDayOfInterval({ start: getDateRange.start, end: getDateRange.end })
        : eachMonthOfInterval({ start: getDateRange.start, end: getDateRange.end });
      
      let totalOccupancy = 0;
      let totalOccupied = 0;
      
      days.forEach(day => {
        const data = generateMockDataForDate(day);
        totalOccupancy += data.occupancyRate;
        totalOccupied += data.occupiedRooms;
      });

      const avgOccupancyRate = Math.round(totalOccupancy / days.length);
      const avgOccupied = Math.round(totalOccupied / days.length);

      return {
        totalRooms: rooms.length,
        occupiedRooms: avgOccupied,
        availableRooms: rooms.length - avgOccupied,
        outOfOrder: 1,
        maintenance: 1,
        houseUse: 1,
        complimentary: 0,
        occupancyRate: avgOccupancyRate
      };
    }
  };

  // Calculate guest movement
  const calculateGuestMovement = () => {
    if (periodType === 'daily') {
      const arrivals = bookings.filter(b => b.status === 'checked-in').length;
      const departures = bookings.filter(b => b.status === 'checked-out').length;
      const expectedArrivals = bookings.filter(b => b.status === 'confirmed').length;
      const expectedDepartures = 1;
      const noShows = 0;
      const walkIns = bookings.filter(b => b.type === 'walk-in' && b.status === 'checked-in').length;
      const stayovers = bookings.filter(b => b.status === 'checked-in').length;
      const inHouseGuests = guests.filter(g => g.status === 'checked-in').length;

      return {
        arrivals,
        departures,
        expectedArrivals,
        expectedDepartures,
        noShows,
        walkIns,
        stayovers,
        inHouseGuests
      };
    } else {
      // For monthly/yearly, calculate totals
      const days = periodType === 'monthly' 
        ? eachDayOfInterval({ start: getDateRange.start, end: getDateRange.end })
        : eachMonthOfInterval({ start: getDateRange.start, end: getDateRange.end });
      
      let totalArrivals = 0;
      let totalDepartures = 0;
      
      days.forEach(day => {
        const data = generateMockDataForDate(day);
        totalArrivals += data.arrivals;
        totalDepartures += data.departures;
      });

      return {
        arrivals: totalArrivals,
        departures: totalDepartures,
        expectedArrivals: 0,
        expectedDepartures: 0,
        noShows: Math.floor(totalArrivals * 0.02),
        walkIns: Math.floor(totalArrivals * 0.15),
        stayovers: 0,
        inHouseGuests: guests.filter(g => g.status === 'checked-in').length
      };
    }
  };

  // Calculate financial summary
  const calculateFinancial = () => {
    if (periodType === 'daily') {
      const roomRevenue = folioTransactions
        .filter(t => t.category === 'room' && t.type === 'charge')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const fbRevenue = folioTransactions
        .filter(t => (t.category === 'restaurant' || t.category === 'minibar') && t.type === 'charge')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const servicesRevenue = folioTransactions
        .filter(t => ['spa', 'laundry', 'parking', 'other'].includes(t.category || '') && t.type === 'charge')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalRevenue = roomRevenue + fbRevenue + servicesRevenue;
      
      const cashPayments = folioTransactions
        .filter(t => t.type === 'payment' && t.paymentMethod === 'cash')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const cardPayments = folioTransactions
        .filter(t => t.type === 'payment' && (t.paymentMethod === 'credit-card' || t.paymentMethod === 'debit-card'))
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const otherPayments = folioTransactions
        .filter(t => t.type === 'payment' && !['cash', 'credit-card', 'debit-card'].includes(t.paymentMethod || ''))
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const totalPayments = cashPayments + cardPayments + otherPayments;
      
      const outstandingBalance = folios.reduce((sum, f) => sum + f.balance, 0);
      
      const depositsReceived = deposits
        .filter(d => d.status === 'received')
        .reduce((sum, d) => sum + d.amount, 0);
      
      const depositsApplied = deposits
        .filter(d => d.status === 'applied')
        .reduce((sum, d) => sum + d.amount, 0);

      return {
        roomRevenue,
        fbRevenue,
        servicesRevenue,
        totalRevenue,
        cashPayments,
        cardPayments,
        otherPayments,
        totalPayments,
        outstandingBalance,
        depositsReceived,
        depositsApplied
      };
    } else {
      // For monthly/yearly, calculate totals
      const days = periodType === 'monthly' 
        ? eachDayOfInterval({ start: getDateRange.start, end: getDateRange.end })
        : eachMonthOfInterval({ start: getDateRange.start, end: getDateRange.end });
      
      let totalRoomRevenue = 0;
      let totalFbRevenue = 0;
      let totalServicesRevenue = 0;
      
      days.forEach(day => {
        const data = generateMockDataForDate(day);
        totalRoomRevenue += data.roomRevenue;
        totalFbRevenue += data.fbRevenue;
        totalServicesRevenue += data.servicesRevenue;
      });

      const totalRevenue = totalRoomRevenue + totalFbRevenue + totalServicesRevenue;
      const cashPayments = Math.round(totalRevenue * 0.25);
      const cardPayments = Math.round(totalRevenue * 0.65);
      const otherPayments = Math.round(totalRevenue * 0.10);

      return {
        roomRevenue: totalRoomRevenue,
        fbRevenue: totalFbRevenue,
        servicesRevenue: totalServicesRevenue,
        totalRevenue,
        cashPayments,
        cardPayments,
        otherPayments,
        totalPayments: cashPayments + cardPayments + otherPayments,
        outstandingBalance: Math.round(totalRevenue * 0.08),
        depositsReceived: Math.round(totalRevenue * 0.15),
        depositsApplied: Math.round(totalRevenue * 0.12)
      };
    }
  };

  // Calculate housekeeping
  const calculateHousekeeping = () => {
    return {
      cleanRooms: rooms.filter(r => r.housekeepingStatus === 'clean').length,
      dirtyRooms: rooms.filter(r => r.housekeepingStatus === 'dirty').length,
      inspectedRooms: rooms.filter(r => r.housekeepingStatus === 'inspected').length
    };
  };

  // Generate breakdown data for monthly/yearly views
  const generateBreakdownData = (): PeriodBreakdownRow[] => {
    if (periodType === 'daily') return [];

    if (periodType === 'monthly') {
      const days = eachDayOfInterval({ start: getDateRange.start, end: getDateRange.end });
      return days.map(day => {
        const data = generateMockDataForDate(day);
        return {
          label: format(day, 'MMM dd'),
          occupancyRate: data.occupancyRate,
          revenue: data.roomRevenue + data.fbRevenue + data.servicesRevenue,
          arrivals: data.arrivals,
          departures: data.departures
        };
      });
    } else {
      const months = eachMonthOfInterval({ start: getDateRange.start, end: getDateRange.end });
      return months.map(month => {
        const daysInMonth = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
        let totalOccupancy = 0;
        let totalRevenue = 0;
        let totalArrivals = 0;
        let totalDepartures = 0;

        daysInMonth.forEach(day => {
          const data = generateMockDataForDate(day);
          totalOccupancy += data.occupancyRate;
          totalRevenue += data.roomRevenue + data.fbRevenue + data.servicesRevenue;
          totalArrivals += data.arrivals;
          totalDepartures += data.departures;
        });

        return {
          label: format(month, 'MMMM'),
          occupancyRate: Math.round(totalOccupancy / daysInMonth.length),
          revenue: totalRevenue,
          arrivals: totalArrivals,
          departures: totalDepartures
        };
      });
    }
  };

  const roomStats = calculateRoomStats();
  const guestMovement = calculateGuestMovement();
  const financial = calculateFinancial();
  const housekeeping = calculateHousekeeping();
  const breakdownData = generateBreakdownData();

  const handleRunAudit = () => {
    if (periodType !== 'daily') {
      toast('Run Audit is only available for daily reports.')
      // toast({
      //   title: "Audit Not Available",
      //   description: "Run Audit is only available for daily reports.",
      //   variant: "destructive"
      // });
      return;
    }

    setAuditStatus("in-progress");
    toast("Night Audit Started");
    // toast({
    //   title: "Night Audit Started",
    //   description: "Processing daily transactions and updating records...",
    // });

    setTimeout(() => {
      setAuditStatus("closed");
      toast("Night Audit Complete");
      // toast({
      //   title: "Night Audit Complete",
      //   description: `Audit for ${format(businessDate, 'MMM dd, yyyy')} has been closed.`,
      // });
    }, 2000);
  };

  const handleExportPDF = () => {
    const periodTitle = periodType === 'daily' 
      ? format(businessDate, 'MMMM dd, yyyy')
      : periodType === 'monthly'
        ? format(new Date(selectedYear, selectedMonth), 'MMMM yyyy')
        : selectedYear.toString();

    const report: NightAuditReport = {
      id: crypto.randomUUID(),
      businessDate: format(businessDate, 'yyyy-MM-dd'),
      periodType,
      periodStart: format(getDateRange.start, 'yyyy-MM-dd'),
      periodEnd: format(getDateRange.end, 'yyyy-MM-dd'),
      status: auditStatus,
      roomStats,
      guestMovement,
      financial,
      housekeeping,
      breakdownData: periodType !== 'daily' ? breakdownData : undefined,
      createdAt: new Date().toISOString()
    };

    const doc = generateNightAuditPDF(report);
    const filename = periodType === 'daily' 
      ? `night_audit_${format(businessDate, 'yyyyMMdd')}`
      : periodType === 'monthly'
        ? `monthly_audit_${format(new Date(selectedYear, selectedMonth), 'yyyyMM')}`
        : `yearly_audit_${selectedYear}`;
    
    downloadPDF(doc, filename);

    toast("PDF Exported");
    
    // toast({
    //   title: "PDF Exported",
    //   description: `${periodType.charAt(0).toUpperCase() + periodType.slice(1)} audit report has been downloaded.`,
    // });
  };

  const getStatusBadge = (status: NightAuditStatus) => {
    const variants = {
      'open': { variant: 'outline' as const, icon: Clock, label: 'Open' },
      'in-progress': { variant: 'secondary' as const, icon: PlayCircle, label: 'In Progress' },
      'closed': { variant: 'default' as const, icon: CheckCircle2, label: 'Closed' }
    };
    const { variant, icon: Icon, label } = variants[status];
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getPeriodLabel = () => {
    switch (periodType) {
      case 'daily':
        return format(businessDate, 'MMM dd, yyyy');
      case 'monthly':
        return format(new Date(selectedYear, selectedMonth), 'MMMM yyyy');
      case 'yearly':
        return selectedYear.toString();
    }
  };

  return (
    <div>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Moon className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Night Audit</h1>
                <p className="text-sm text-muted-foreground">
                  {periodType === 'daily' ? 'Daily reconciliation' : periodType === 'monthly' ? 'Monthly summary' : 'Annual report'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {periodType === 'daily' && getStatusBadge(auditStatus)}
              
              <Button 
                onClick={handleRunAudit} 
                disabled={auditStatus === 'closed' || auditStatus === 'in-progress' || periodType !== 'daily'}
                className="gap-2"
              >
                <PlayCircle className="h-4 w-4" />
                Run Audit
              </Button>
              <Button variant="outline" onClick={handleExportPDF} className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
            <Tabs value={periodType} onValueChange={(v) => setPeriodType(v as AuditPeriod)} className="w-auto">
              <TabsList>
                <TabsTrigger value="daily" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Daily
                </TabsTrigger>
                <TabsTrigger value="monthly" className="gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="yearly" className="gap-2">
                  <CalendarRange className="h-4 w-4" />
                  Yearly
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Dynamic Date Selector */}
            <div className="flex items-center gap-2">
              {periodType === 'daily' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      {format(businessDate, "MMM dd, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <CalendarPicker
                      mode="single"
                      selected={businessDate}
                      onSelect={(date) => date && setBusinessDate(date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              )}

              {periodType === 'monthly' && (
                <>
                  <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={index} value={index.toString()}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}

              {periodType === 'yearly' && (
                <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Room Statistics */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Room Statistics</CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{roomStats.occupancyRate}%</span>
                <span className="text-sm text-muted-foreground">
                  {periodType === 'daily' ? 'Occupancy' : 'Avg. Occupancy'}
                </span>
              </div>
              <Progress value={roomStats.occupancyRate} className="h-2" />
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {periodType === 'daily' ? 'Occupied' : 'Avg. Occupied'}
                  </p>
                  <p className="text-lg font-semibold">{roomStats.occupiedRooms}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {periodType === 'daily' ? 'Available' : 'Avg. Available'}
                  </p>
                  <p className="text-lg font-semibold">{roomStats.availableRooms}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">OOO/Maint.</p>
                  <p className="text-lg font-semibold">{roomStats.outOfOrder + roomStats.maintenance}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">House Use</p>
                  <p className="text-lg font-semibold">{roomStats.houseUse}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guest Movement */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Guest Movement</CardTitle>
              <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{guestMovement.inHouseGuests}</span>
                <span className="text-sm text-muted-foreground">In-House</span>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {periodType === 'daily' ? 'Arrivals' : 'Total Arrivals'}
                  </p>
                  <p className="text-lg font-semibold text-success">{guestMovement.arrivals}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {periodType === 'daily' ? 'Departures' : 'Total Departures'}
                  </p>
                  <p className="text-lg font-semibold text-info">{guestMovement.departures}</p>
                </div>
                {periodType === 'daily' && (
                  <>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Expected Arr.</p>
                      <p className="text-lg font-semibold">{guestMovement.expectedArrivals}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Walk-ins</p>
                      <p className="text-lg font-semibold">{guestMovement.walkIns}</p>
                    </div>
                  </>
                )}
                {periodType !== 'daily' && (
                  <>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">No-Shows</p>
                      <p className="text-lg font-semibold">{guestMovement.noShows}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Walk-ins</p>
                      <p className="text-lg font-semibold">{guestMovement.walkIns}</p>
                    </div>
                  </>
                )}
              </div>
              {periodType === 'daily' && guestMovement.noShows > 0 && (
                <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{guestMovement.noShows} No-Shows</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Financial Summary</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">${financial.totalRevenue.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">
                  {periodType === 'daily' ? 'Revenue' : 'Total Revenue'}
                </span>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Room Revenue</span>
                  <span className="font-medium">${financial.roomRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">F&B Revenue</span>
                  <span className="font-medium">${financial.fbRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Services</span>
                  <span className="font-medium">${financial.servicesRevenue.toLocaleString()}</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Payments</span>
                  <span className="font-medium text-success">${financial.totalPayments.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Outstanding</span>
                  <span className="font-medium text-warning">${financial.outstandingBalance.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Housekeeping */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Housekeeping</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{housekeeping.cleanRooms + housekeeping.inspectedRooms}</span>
                <span className="text-sm text-muted-foreground">Ready</span>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-success" />
                    <span className="text-sm">Clean</span>
                  </div>
                  <span className="font-semibold">{housekeeping.cleanRooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-info" />
                    <span className="text-sm">Inspected</span>
                  </div>
                  <span className="font-semibold">{housekeeping.inspectedRooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-warning" />
                    <span className="text-sm">Dirty</span>
                  </div>
                  <span className="font-semibold">{housekeeping.dirtyRooms}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Period Breakdown Table (Monthly/Yearly only) */}
        {periodType !== 'daily' && breakdownData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>
                {periodType === 'monthly' ? 'Daily Breakdown' : 'Monthly Breakdown'}
              </CardTitle>
              <CardDescription>
                {periodType === 'monthly' 
                  ? `Detailed statistics for ${format(new Date(selectedYear, selectedMonth), 'MMMM yyyy')}`
                  : `Detailed statistics for ${selectedYear}`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-[400px] overflow-auto rounded-xl">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{periodType === 'monthly' ? 'Date' : 'Month'}</TableHead>
                      <TableHead className="text-right">Occupancy</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Arrivals</TableHead>
                      <TableHead className="text-right">Departures</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {breakdownData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.label}</TableCell>
                        <TableCell className="text-right">{row.occupancyRate}%</TableCell>
                        <TableCell className="text-right">${row.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{row.arrivals}</TableCell>
                        <TableCell className="text-right">{row.departures}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detailed Breakdown */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Payment Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Breakdown</CardTitle>
              <CardDescription>Payments received by method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Cash</p>
                      <p className="text-sm text-muted-foreground">Direct payments</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">${financial.cashPayments.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-info" />
                    </div>
                    <div>
                      <p className="font-medium">Card Payments</p>
                      <p className="text-sm text-muted-foreground">Credit & Debit cards</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">${financial.cardPayments.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Other</p>
                      <p className="text-sm text-muted-foreground">Bank transfer, online</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">${financial.otherPayments.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deposits Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Deposits Summary</CardTitle>
              <CardDescription>Deposit status overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Deposits Received</p>
                      <p className="text-sm text-muted-foreground">Pending application</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">${financial.depositsReceived.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-info" />
                    </div>
                    <div>
                      <p className="font-medium">Deposits Applied</p>
                      <p className="text-sm text-muted-foreground">Applied to folios</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">${financial.depositsApplied.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NightAudit;
