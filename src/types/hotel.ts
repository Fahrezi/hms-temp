/* eslint-disable max-lines */
export type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'cleaning' | 'out-of-order' | 'house-use' | 'complimentary';
export type HousekeepingStatus = 'clean' | 'dirty' | 'inspected';
export type RoomType = 'single' | 'double' | 'suite' | 'deluxe';
export type BookingStatus = 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'no-show';
export type BookingType = 'reservation' | 'walk-in';
export type ReservationMode = 'individual' | 'block' | 'tour-series' | 'group';
export type GuestStatus = 'checked-in' | 'checked-out' | 'reserved' | 'no-show' | 'cancelled';
export type GuestHotelStatus = 'in-house' | 'arriving-today' | 'arriving-soon' | 'reserved' | 'departing-today' | 'departed' | 'no-reservation' | 'profile-only';
export type GuestType = 'profile-only' | 'reservation-linked';
export type VIPLevel = 'regular' | 'vip' | 'vvip';

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  floor: number;
  price: number;
  status: RoomStatus;
  housekeepingStatus: HousekeepingStatus;
  amenities: string[];
  availableServices: string[]; // IDs of services from ServiceCatalog available to this room
  capacity: number;
}

export type IdType = 'passport' | 'national-id' | 'driving-license' | 'other';

export interface GuestDetail {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  detailAddress: string;
  mailingAddress: string;
  country: string;
  idNumber: string;
  idType: IdType;
  specialDay?: string;
  companyProfile?: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  idNumber: string;
  idType?: IdType;
  status: GuestStatus;
  notes?: string;
  createdAt: string;
  firstName?: string;
  lastName?: string;
  detailAddress?: string;
  mailingAddress?: string;
  country?: string;
  specialDay?: string;
  companyProfile?: string;
  guestType?: GuestType;
  vipLevel?: VIPLevel;
  preferredRoomType?: RoomType;
  marketingConsent?: boolean;
}

export interface RoomReservation {
  id: string;
  roomId: string;
  adults: number;
  children: number;
  guestId?: string;
  rateCode: string;
}

export interface Booking {
  id: string;
  rsvpNo: string;
  guestId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  type: BookingType;
  mode?: ReservationMode;
  totalAmount: number;
  specialRequests?: string;
  rateCode?: string;
  adults?: number;
  children?: number;
  roomCount?: number;
  eta?: string;
  groupName?: string;
  rateSource?: string;
  depositAmount?: number;
  createdBy?: string;
  isNonRefundable?: boolean;
  rnw?: number;
  accountNotes?: string;
  traces?: string;
  createdAt: string;
  rooms?: RoomReservation[];
}

export interface DashboardStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  monthlyRevenue: number;
  occupancyRate: number;
}

export interface Activity {
  id: string;
  type: 'check-in' | 'check-out' | 'booking' | 'cancellation' | 'guest-request' | 'lost-item' | 'found-item' | 'item-returned';
  description: string;
  timestamp: string;
}

// Financial System Types
export type DepositStatus = 'pending' | 'received' | 'applied' | 'refunded' | 'forfeited';
export type PaymentMethod = 'cash' | 'credit-card' | 'debit-card' | 'bank-transfer' | 'online';
export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'unionpay' | 'other';
export type MembershipTier = 'none' | 'silver' | 'gold' | 'platinum' | 'diamond';

// Payment Card Information
export interface PaymentCardInfo {
  cardType: CardType;
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

// Company Entity (stored company profile)
export interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  taxId: string;
  corporateAccountId: string;
  billingContact: string;
  contractedRate?: number; // Discount percentage
  creditLimit?: number;
  paymentTerms?: string; // e.g., "Net 30"
  isActive: boolean;
  createdAt: string;
  notes?: string;
}

// Company Information (used in forms/reservations)
export interface CompanyInfo {
  companyId?: string; // Reference to Company entity
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  taxId: string;
  corporateAccountId: string;
  billingContact: string;
}

// Membership Information
export interface MembershipInfo {
  programName: string;
  memberNumber: string;
  tier: MembershipTier;
  pointsBalance?: number;
  memberSince?: string;
}

export interface Deposit {
  id: string;
  bookingId: string;
  guestId: string;
  amount: number;
  status: DepositStatus;
  paymentMethod: PaymentMethod;
  receivedAt?: string;
  appliedAt?: string;
  refundedAt?: string;
  notes?: string;
  paymentCard?: PaymentCardInfo;
  // Prepared for Stripe integration
  stripePaymentIntentId?: string;
  stripeRefundId?: string;
}

// Folio/Billing System
export type FolioTransactionType = 'charge' | 'payment' | 'deposit-applied' | 'discount' | 'refund';
export type ServiceCategory = 'room' | 'restaurant' | 'minibar' | 'spa' | 'laundry' | 'parking' | 'other';

export interface FolioTransaction {
  id: string;
  folioId: string;
  type: FolioTransactionType;
  category?: ServiceCategory;
  description: string;
  amount: number;
  paymentMethod?: PaymentMethod;
  createdAt: string;
  createdBy?: string;
}

export interface Folio {
  id: string;
  bookingId: string;
  guestId: string;
  roomId: string;
  transactions: FolioTransaction[];
  totalCharges: number;
  totalPayments: number;
  balance: number;
  status: 'open' | 'settled' | 'disputed';
  createdAt: string;
  settledAt?: string;
}

// Service Catalog
export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  description?: string;
  isActive: boolean;
}

// Night Audit Types
export type NightAuditStatus = 'open' | 'in-progress' | 'closed';

export interface NightAuditRoomStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  outOfOrder: number;
  maintenance: number;
  houseUse: number;
  complimentary: number;
  occupancyRate: number;
}

export interface NightAuditGuestMovement {
  arrivals: number;
  departures: number;
  expectedArrivals: number;
  expectedDepartures: number;
  noShows: number;
  walkIns: number;
  stayovers: number;
  inHouseGuests: number;
}

export interface NightAuditFinancial {
  roomRevenue: number;
  fbRevenue: number;
  servicesRevenue: number;
  totalRevenue: number;
  cashPayments: number;
  cardPayments: number;
  otherPayments: number;
  totalPayments: number;
  outstandingBalance: number;
  depositsReceived: number;
  depositsApplied: number;
}

export interface NightAuditHousekeeping {
  cleanRooms: number;
  dirtyRooms: number;
  inspectedRooms: number;
}

export type AuditPeriod = 'daily' | 'monthly' | 'yearly';

export interface PeriodBreakdownRow {
  label: string; // Date for monthly, Month name for yearly
  occupancyRate: number;
  revenue: number;
  arrivals: number;
  departures: number;
}

export interface NightAuditReport {
  id: string;
  businessDate: string;
  periodType: AuditPeriod;
  periodStart: string;
  periodEnd: string;
  status: NightAuditStatus;
  roomStats: NightAuditRoomStats;
  guestMovement: NightAuditGuestMovement;
  financial: NightAuditFinancial;
  housekeeping: NightAuditHousekeeping;
  breakdownData?: PeriodBreakdownRow[];
  createdAt: string;
  closedAt?: string;
  closedBy?: string;
  notes?: string;
}

// Guest Requests Types
export type RequestCategory = 'housekeeping' | 'room-service' | 'maintenance' | 'wake-up' | 'concierge' | 'general';
export type RequestPriority = 'low' | 'medium' | 'high' | 'urgent';
export type RequestStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export interface GuestRequest {
  id: string;
  guestId: string;
  guestName: string;
  roomNumber: string;
  category: RequestCategory;
  priority: RequestPriority;
  status: RequestStatus;
  title: string;
  description: string;
  requestedAt: string;
  assignedTo?: string;
  completedAt?: string;
  notes?: string;
}

// Lost & Found Types
export type LostFoundStatus = 'reported' | 'found' | 'matched' | 'returned' | 'disposed';
export type LostFoundCategory = 'electronics' | 'jewelry' | 'clothing' | 'documents' | 'bags' | 'keys' | 'other';
export type LostFoundType = 'lost' | 'found';

export interface LostFoundItem {
  id: string;
  type: LostFoundType;
  status: LostFoundStatus;
  category: LostFoundCategory;
  itemName: string;
  description: string;
  location: string;
  reportedDate: string;
  reportedBy: string;
  guestId?: string;
  roomNumber?: string;
  contactInfo?: string;
  matchedItemId?: string;
  returnedDate?: string;
  storageLocation?: string;
  notes?: string;
}

// Trace Types
export type TraceType = 'reminder' | 'inventory-request' | 'leisure-booking';
export type TraceStatus = 'pending' | 'completed' | 'cancelled';

export interface Trace {
  id: string;
  type: TraceType;
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  assignedTo?: string;
  status: TraceStatus;
  createdAt: string;
  // Inventory Request specific
  quantity?: number;
  itemName?: string;
  deliveryTime?: string;
  // Leisure Booking specific
  activityName?: string;
  venue?: string;
  pax?: number;
  confirmationNumber?: string;
}

// Deposit Info
export interface DepositInfo {
  amount: number;
  paymentMethod: PaymentMethod | '';
  receiptNumber: string;
  depositDate: string;
  receivedBy: string;
  isNonRefundable: boolean;
  paymentCard?: PaymentCardInfo;
}

// Booking Extended Info
export interface BookingExtendedInfo {
  eta?: string;
  etd?: string;
  companyInfo?: CompanyInfo;
  membershipInfo?: MembershipInfo;
}

// Block Reservation Types
export type ReleasePolicy = 'auto' | 'manual' | 'notify';

export interface BlockReservationInfo {
  blockCode: string;
  blockName: string;
  cutoffDate: string;
  allotmentStart: string;
  allotmentEnd: string;
  roomsBlocked: number;
  pickupAllowed: boolean;
  shoulderDatesBefore: number;
  shoulderDatesAfter: number;
  contractId: string;
  releasePolicy: ReleasePolicy;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
}

// Tour Series Types
export interface TourSeriesInfo {
  tourCode: string;
  tourName: string;
  tourOperator: string;
  seriesStartDate: string;
  seriesEndDate: string;
  departureDates: string[];
  roomsPerDeparture: number;
  itineraryReference: string;
  guideName: string;
  guidePhone: string;
  roomingListDueDate: string;
  inclusionNotes: string;
}

// Group Reservation Types
export type GroupType = 'conference' | 'wedding' | 'corporate' | 'social' | 'sports' | 'government' | 'other';
export type BillingArrangement = 'master-account' | 'individual' | 'split';

export interface GroupReservationInfo {
  groupCode: string;
  groupName: string;
  groupType: GroupType;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  roomsRequested: number;
  cutoffDate: string;
  billingArrangement: BillingArrangement;
  eventDetails: string;
  specialInstructions: string;
  roomingListReceived: boolean;
}
