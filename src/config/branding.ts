/**
 * Hotel Branding Configuration
 * 
 * To change the hotel branding:
 * 1. Replace the logo file at /public/hotel-logo.png
 * 2. Update the values below as needed
 * 
 * The logo should be:
 * - Format: PNG or JPG (PNG recommended for transparency)
 * - Size: 200x200 pixels recommended for receipts
 * - Path: Must be in the /public folder
 */

export const hotelBranding = {
  // Basic Info
  name: 'HotelHub',
  tagline: 'Your Comfort, Our Priority',
  
  // Logo path (relative to public folder)
  // To change: replace the file at this path
  logo: '/hotel-logo.png',
  
  // Contact Information
  address: '123 Main Street, City, Country 12345',
  phone: '+1 (555) 123-4567',
  email: 'info@hotelhub.com',
  website: 'www.hotelhub.com',
  
  // Legal/Business Info
  taxId: 'TAX-123456789',
  registrationNumber: 'REG-987654321',
  
  // Receipt/Invoice Settings
  receiptFooter: 'Thank you for staying with us! We hope to see you again.',
  invoiceTerms: 'Payment is due upon checkout. All prices include applicable taxes unless otherwise stated.',
  
  // Currency Settings
  currency: 'USD',
  currencySymbol: '$',
  
  // Theme Colors (for PDF generation)
  primaryColor: '#1e40af', // Blue
  secondaryColor: '#64748b', // Slate
};

export type HotelBranding = typeof hotelBranding;
