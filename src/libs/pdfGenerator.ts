/* eslint-disable max-lines */
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { hotelBranding } from '@/config/branding';

interface PDFOptions {
  title: string;
  subtitle?: string;
  dateRange?: { from: Date; to: Date };
}

interface TableColumn {
  header: string;
  dataKey: string;
}

interface ReceiptItem {
  description: string;
  amount: number;
}

interface ReceiptData {
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod?: string;
}

// Helper to add hotel header to PDF
const addHeader = (doc: jsPDF, options: PDFOptions) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Hotel name
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175); // Primary blue
  doc.text(hotelBranding.name, pageWidth / 2, 20, { align: 'center' });
  
  // Tagline
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139); // Slate
  doc.text(hotelBranding.tagline, pageWidth / 2, 27, { align: 'center' });
  
  // Contact info
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(hotelBranding.address, pageWidth / 2, 33, { align: 'center' });
  doc.text(`Tel: ${hotelBranding.phone} | Email: ${hotelBranding.email}`, pageWidth / 2, 38, { align: 'center' });
  
  // Line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 42, pageWidth - 20, 42);
  
  // Report title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(options.title, pageWidth / 2, 52, { align: 'center' });
  
  // Subtitle or date range
  if (options.subtitle) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(options.subtitle, pageWidth / 2, 58, { align: 'center' });
  }
  
  if (options.dateRange) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const dateText = `${format(options.dateRange.from, 'MMM dd, yyyy')} - ${format(options.dateRange.to, 'MMM dd, yyyy')}`;
    doc.text(dateText, pageWidth / 2, options.subtitle ? 64 : 58, { align: 'center' });
  }
  
  return options.dateRange ? 70 : (options.subtitle ? 65 : 60);
};

// Helper to add footer
const addFooter = (doc: jsPDF) => {
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(128, 128, 128);
  
  // Generated date
  doc.text(`Generated: ${format(new Date(), 'MMM dd, yyyy HH:mm')}`, 20, pageHeight - 15);
  
  // Tax ID
  doc.text(`Tax ID: ${hotelBranding.taxId}`, pageWidth - 20, pageHeight - 15, { align: 'right' });
  
  // Page number
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }
};

// Generate report PDF with table
export const generateReportPDF = (
  options: PDFOptions,
  columns: TableColumn[],
  data: Record<string, string | number>[],
  summary?: { label: string; value: string }[]
) => {
  const doc = new jsPDF();
  const startY = addHeader(doc, options);
  
  // Table
  autoTable(doc, {
    startY,
    head: [columns.map(col => col.header)],
    body: data.map(row => columns.map(col => row[col.dataKey]?.toString() || '')),
    headStyles: {
      fillColor: [30, 64, 175],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
  });
  
  // Summary section if provided
  if (summary && summary.length > 0) {
    const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    summary.forEach((item, index) => {
      doc.text(`${item.label}: ${item.value}`, 20, finalY + (index * 6));
    });
  }
  
  addFooter(doc);
  
  return doc;
};

// Generate receipt PDF
export const generateReceiptPDF = (data: ReceiptData) => {
  const doc = new jsPDF({
    format: [80, 200], // Receipt paper size (80mm width)
    unit: 'mm',
  });
  
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 10;
  
  // Hotel name
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(hotelBranding.name, pageWidth / 2, y, { align: 'center' });
  y += 5;
  
  // Address
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(hotelBranding.address, pageWidth / 2, y, { align: 'center' });
  y += 4;
  doc.text(`Tel: ${hotelBranding.phone}`, pageWidth / 2, y, { align: 'center' });
  y += 6;
  
  // Line
  doc.setDrawColor(0);
  doc.line(5, y, pageWidth - 5, y);
  y += 5;
  
  // Receipt title
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('RECEIPT', pageWidth / 2, y, { align: 'center' });
  y += 6;
  
  // Guest info
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Guest: ${data.guestName}`, 5, y);
  y += 4;
  doc.text(`Room: ${data.roomNumber}`, 5, y);
  y += 4;
  doc.text(`Check-in: ${data.checkIn}`, 5, y);
  y += 4;
  doc.text(`Check-out: ${data.checkOut}`, 5, y);
  y += 6;
  
  // Line
  doc.line(5, y, pageWidth - 5, y);
  y += 5;
  
  // Items
  doc.setFontSize(7);
  data.items.forEach(item => {
    const amount = `${hotelBranding.currencySymbol}${item.amount.toFixed(2)}`;
    doc.text(item.description, 5, y);
    doc.text(amount, pageWidth - 5, y, { align: 'right' });
    y += 4;
  });
  
  y += 2;
  doc.line(5, y, pageWidth - 5, y);
  y += 5;
  
  // Totals
  doc.setFontSize(8);
  doc.text('Subtotal:', 5, y);
  doc.text(`${hotelBranding.currencySymbol}${data.subtotal.toFixed(2)}`, pageWidth - 5, y, { align: 'right' });
  y += 4;
  
  doc.text('Tax:', 5, y);
  doc.text(`${hotelBranding.currencySymbol}${data.tax.toFixed(2)}`, pageWidth - 5, y, { align: 'right' });
  y += 5;
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('TOTAL:', 5, y);
  doc.text(`${hotelBranding.currencySymbol}${data.total.toFixed(2)}`, pageWidth - 5, y, { align: 'right' });
  y += 6;
  
  if (data.paymentMethod) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Payment: ${data.paymentMethod}`, 5, y);
    y += 5;
  }
  
  // Footer
  y += 5;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.text(hotelBranding.receiptFooter, pageWidth / 2, y, { align: 'center', maxWidth: pageWidth - 10 });
  
  return doc;
};

// Generate Night Audit PDF
// eslint-disable-next-line sonarjs/cognitive-complexity
export const generateNightAuditPDF = (report: import('@/types/hotel').NightAuditReport) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Determine title based on period type
  const periodType = report.periodType || 'daily';
  let title = 'Night Audit Report';
  let subtitle = `Business Date: ${format(new Date(report.businessDate), 'MMMM dd, yyyy')}`;
  
  if (periodType === 'monthly') {
    title = 'Monthly Audit Report';
    subtitle = `Period: ${format(new Date(report.periodStart), 'MMMM yyyy')}`;
  } else if (periodType === 'yearly') {
    title = 'Annual Audit Report';
    subtitle = `Period: ${format(new Date(report.periodStart), 'yyyy')}`;
  }
  
  // Header
  const startY = addHeader(doc, { title, subtitle });
  
  let y = startY + 5;
  
  // Status badge (only for daily)
  if (periodType === 'daily') {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Status: ${report.status.toUpperCase()}`, 20, y);
    y += 10;
  } else {
    y += 5;
  }
  
  // Room Statistics Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('Room Statistics', 20, y);
  y += 6;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  
  const roomData = [
    [periodType === 'daily' ? 'Occupied Rooms' : 'Avg. Occupied', report.roomStats.occupiedRooms.toString()],
    [periodType === 'daily' ? 'Available Rooms' : 'Avg. Available', report.roomStats.availableRooms.toString()],
    ['Out of Order', report.roomStats.outOfOrder.toString()],
    ['Maintenance', report.roomStats.maintenance.toString()],
    ['House Use', report.roomStats.houseUse.toString()],
    [periodType === 'daily' ? 'Occupancy Rate' : 'Avg. Occupancy', `${report.roomStats.occupancyRate}%`]
  ];
  
  autoTable(doc, {
    startY: y,
    head: [['Metric', 'Value']],
    body: roomData,
    theme: 'striped',
    headStyles: { fillColor: [30, 64, 175] },
    margin: { left: 20, right: pageWidth / 2 + 10 },
    tableWidth: (pageWidth / 2) - 30,
  });
  
  // Guest Movement Section (right column)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('Guest Movement', pageWidth / 2 + 10, startY + 5);
  
  const guestData = [
    [periodType === 'daily' ? 'Arrivals' : 'Total Arrivals', report.guestMovement.arrivals.toString()],
    [periodType === 'daily' ? 'Departures' : 'Total Departures', report.guestMovement.departures.toString()],
    ['Expected Arrivals', report.guestMovement.expectedArrivals.toString()],
    ['Expected Departures', report.guestMovement.expectedDepartures.toString()],
    ['Walk-ins', report.guestMovement.walkIns.toString()],
    ['In-House Guests', report.guestMovement.inHouseGuests.toString()]
  ];
  
  autoTable(doc, {
    startY: startY + 11,
    head: [['Metric', 'Value']],
    body: guestData,
    theme: 'striped',
    headStyles: { fillColor: [30, 64, 175] },
    margin: { left: pageWidth / 2 + 10, right: 20 },
    tableWidth: (pageWidth / 2) - 30,
  });
  
  // Get the Y position after tables
  const tableEndY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;
  y = tableEndY;
  
  // Financial Summary
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('Financial Summary', 20, y);
  y += 6;
  
  const financialData = [
    ['Room Revenue', `$${report.financial.roomRevenue.toLocaleString()}`],
    ['F&B Revenue', `$${report.financial.fbRevenue.toLocaleString()}`],
    ['Services Revenue', `$${report.financial.servicesRevenue.toLocaleString()}`],
    [periodType === 'daily' ? 'Total Revenue' : 'Total Revenue', `$${report.financial.totalRevenue.toLocaleString()}`],
    ['', ''],
    ['Cash Payments', `$${report.financial.cashPayments.toLocaleString()}`],
    ['Card Payments', `$${report.financial.cardPayments.toLocaleString()}`],
    ['Other Payments', `$${report.financial.otherPayments.toLocaleString()}`],
    ['Total Payments', `$${report.financial.totalPayments.toLocaleString()}`],
    ['', ''],
    ['Outstanding Balance', `$${report.financial.outstandingBalance.toLocaleString()}`],
    ['Deposits Received', `$${report.financial.depositsReceived.toLocaleString()}`],
    ['Deposits Applied', `$${report.financial.depositsApplied.toLocaleString()}`]
  ];
  
  autoTable(doc, {
    startY: y,
    head: [['Description', 'Amount']],
    body: financialData,
    theme: 'striped',
    headStyles: { fillColor: [30, 64, 175] },
    margin: { left: 20, right: pageWidth / 2 + 10 },
    tableWidth: (pageWidth / 2) - 30,
  });
  
  // Housekeeping Section (right column)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('Housekeeping Status', pageWidth / 2 + 10, tableEndY);
  
  const housekeepingData = [
    ['Clean Rooms', report.housekeeping.cleanRooms.toString()],
    ['Inspected Rooms', report.housekeeping.inspectedRooms.toString()],
    ['Dirty Rooms', report.housekeeping.dirtyRooms.toString()],
    ['Ready for Check-in', (report.housekeeping.cleanRooms + report.housekeeping.inspectedRooms).toString()]
  ];
  
  autoTable(doc, {
    startY: tableEndY + 6,
    head: [['Status', 'Count']],
    body: housekeepingData,
    theme: 'striped',
    headStyles: { fillColor: [30, 64, 175] },
    margin: { left: pageWidth / 2 + 10, right: 20 },
    tableWidth: (pageWidth / 2) - 30,
  });
  
  // Period Breakdown Table (for monthly/yearly)
  if (periodType !== 'daily' && report.breakdownData && report.breakdownData.length > 0) {
    doc.addPage();
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text(periodType === 'monthly' ? 'Daily Breakdown' : 'Monthly Breakdown', 20, 20);
    
    const breakdownTableData = report.breakdownData.map(row => [
      row.label,
      `${row.occupancyRate}%`,
      `$${row.revenue.toLocaleString()}`,
      row.arrivals.toString(),
      row.departures.toString()
    ]);
    
    autoTable(doc, {
      startY: 30,
      head: [[periodType === 'monthly' ? 'Date' : 'Month', 'Occupancy', 'Revenue', 'Arrivals', 'Departures']],
      body: breakdownTableData,
      theme: 'striped',
      headStyles: { fillColor: [30, 64, 175] },
      styles: { fontSize: 8 },
    });
  }
  
  // Signature section at bottom (only for daily)
  if (periodType === 'daily') {
    const signatureY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 25;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    doc.text('Audited by: _______________________', 20, signatureY);
    doc.text('Date: _______________________', 20, signatureY + 8);
    
    doc.text('Approved by: _______________________', pageWidth / 2 + 10, signatureY);
    doc.text('Date: _______________________', pageWidth / 2 + 10, signatureY + 8);
  }
  
  addFooter(doc);
  
  return doc;
};

// Download PDF helper
export const downloadPDF = (doc: jsPDF, filename: string) => {
  doc.save(`${filename}_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`);
};
