/* eslint-disable max-lines */
import { Activity, Booking, Company,DashboardStats, Deposit, Folio, FolioTransaction, Guest, GuestRequest, LostFoundItem, Room, ServiceItem } from '@/types/hotel';
export const rooms: Room[] = [
  { id: '1', number: '101', type: 'single', floor: 1, price: 89, status: 'occupied', housekeepingStatus: 'clean', amenities: ['WiFi', 'TV', 'AC'], availableServices: ['1', '2', '3', '10', '11', '17'], capacity: 1 },
  { id: '2', number: '102', type: 'single', floor: 1, price: 89, status: 'occupied', housekeepingStatus: 'dirty', amenities: ['WiFi', 'TV', 'AC'], availableServices: ['1', '2', '3', '10', '11', '17'], capacity: 1 },
  { id: '3', number: '103', type: 'double', floor: 1, price: 129, status: 'cleaning', housekeepingStatus: 'dirty', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'], availableServices: ['1', '2', '3', '4', '5', '6', '10', '11', '13', '17', '18'], capacity: 2 },
  { id: '4', number: '104', type: 'double', floor: 1, price: 129, status: 'cleaning', housekeepingStatus: 'dirty', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'], availableServices: ['1', '2', '3', '4', '5', '6', '10', '11', '13', '17', '18'], capacity: 2 },
  { id: '5', number: '201', type: 'double', floor: 2, price: 149, status: 'occupied', housekeepingStatus: 'dirty', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'], availableServices: ['1', '2', '3', '4', '5', '6', '7', '8', '10', '11', '13', '14', '17', '18'], capacity: 2 },
  { id: '6', number: '202', type: 'suite', floor: 2, price: 249, status: 'occupied', housekeepingStatus: 'clean', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'], availableServices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], capacity: 3 },
  { id: '7', number: '203', type: 'suite', floor: 2, price: 249, status: 'maintenance', housekeepingStatus: 'dirty', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'], availableServices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], capacity: 3 },
  { id: '8', number: '204', type: 'double', floor: 2, price: 149, status: 'occupied', housekeepingStatus: 'clean', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'], availableServices: ['1', '2', '3', '4', '5', '6', '7', '8', '10', '11', '13', '14', '17', '18'], capacity: 2 },
  { id: '9', number: '301', type: 'deluxe', floor: 3, price: 349, status: 'available', housekeepingStatus: 'inspected', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Kitchen'], availableServices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], capacity: 4 },
  { id: '10', number: '302', type: 'deluxe', floor: 3, price: 349, status: 'occupied', housekeepingStatus: 'dirty', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Kitchen'], availableServices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], capacity: 4 },
  { id: '11', number: '303', type: 'suite', floor: 3, price: 279, status: 'house-use', housekeepingStatus: 'clean', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'], availableServices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], capacity: 3 },
  { id: '12', number: '304', type: 'deluxe', floor: 3, price: 399, status: 'available', housekeepingStatus: 'clean', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Kitchen', 'Ocean View'], availableServices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], capacity: 4 },
];

export const guests: Guest[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@email.com', phone: '+1 555-0101', idNumber: 'P12345678', status: 'checked-in', createdAt: '2024-01-15', notes: 'Prefers high floor rooms', guestType: 'reservation-linked' },
  { id: '2', name: 'Emily Johnson', email: 'emily.j@email.com', phone: '+1 555-0102', idNumber: 'P23456789', status: 'checked-in', createdAt: '2024-01-16', guestType: 'reservation-linked' },
  { id: '3', name: 'Michael Brown', email: 'm.brown@email.com', phone: '+1 555-0103', idNumber: 'P34567890', status: 'reserved', createdAt: '2024-01-17', notes: 'Allergic to feathers', guestType: 'reservation-linked' },
  { id: '4', name: 'Sarah Davis', email: 'sarah.d@email.com', phone: '+1 555-0104', idNumber: 'P45678901', status: 'checked-out', createdAt: '2024-01-10', guestType: 'reservation-linked' },
  { id: '5', name: 'Robert Wilson', email: 'r.wilson@email.com', phone: '+1 555-0105', idNumber: 'P56789012', status: 'checked-in', createdAt: '2024-01-18', guestType: 'reservation-linked' },
  { id: '6', name: 'Jennifer Lee', email: 'j.lee@email.com', phone: '+1 555-0106', idNumber: 'P67890123', status: 'reserved', createdAt: '2024-01-19', notes: 'VIP guest - anniversary trip', guestType: 'reservation-linked', vipLevel: 'vip' },
  { id: '7', name: 'David Martinez', email: 'd.martinez@email.com', phone: '+1 555-0107', idNumber: 'P78901234', status: 'checked-in', createdAt: '2024-01-20', guestType: 'reservation-linked' },
  { id: '8', name: 'Lisa Anderson', email: 'l.anderson@email.com', phone: '+1 555-0108', idNumber: 'P89012345', status: 'checked-out', createdAt: '2024-01-08', guestType: 'reservation-linked' },
  { id: '9', name: 'Alex Thompson', email: 'alex.t@email.com', phone: '+1 555-0109', idNumber: 'P90123456', status: 'reserved', createdAt: '2024-01-21', guestType: 'profile-only', vipLevel: 'vvip', preferredRoomType: 'suite', notes: 'Frequent corporate traveler' },
  { id: '10', name: 'Maria Garcia', email: 'm.garcia@email.com', phone: '+1 555-0110', idNumber: 'P01234567', status: 'reserved', createdAt: '2024-01-22', guestType: 'profile-only', preferredRoomType: 'deluxe' },
  // New guests for multi-booking scenarios
  { id: '11', name: 'Tom Harris', email: 'tom.harris@email.com', phone: '+1 555-0111', idNumber: 'P11111111', status: 'checked-out', createdAt: '2024-01-10', guestType: 'reservation-linked' },
  { id: '12', name: 'Alice Wong', email: 'alice.wong@email.com', phone: '+1 555-0112', idNumber: 'P22222222', status: 'checked-in', createdAt: '2024-01-17', guestType: 'reservation-linked', notes: 'Prefers quiet rooms' },
  { id: '13', name: 'Kevin Park', email: 'kevin.park@email.com', phone: '+1 555-0113', idNumber: 'P33333333', status: 'checked-out', createdAt: '2024-01-12', guestType: 'reservation-linked' },
  { id: '14', name: 'Rachel Kim', email: 'rachel.kim@email.com', phone: '+1 555-0114', idNumber: 'P44444444', status: 'checked-out', createdAt: '2024-01-16', guestType: 'reservation-linked' },
  { id: '15', name: 'Peter Chang', email: 'peter.chang@email.com', phone: '+1 555-0115', idNumber: 'P55555555', status: 'reserved', createdAt: '2024-01-20', guestType: 'reservation-linked', notes: 'Early check-in requested' },
  { id: '16', name: 'Diana Ross', email: 'diana.ross@email.com', phone: '+1 555-0116', idNumber: 'P66666666', status: 'checked-out', createdAt: '2024-01-03', guestType: 'reservation-linked', vipLevel: 'vip' },
  { id: '17', name: 'Marcus Webb', email: 'marcus.webb@email.com', phone: '+1 555-0117', idNumber: 'P77777777', status: 'no-show', createdAt: '2024-01-08', guestType: 'reservation-linked' },
  { id: '18', name: 'Sophie Turner', email: 'sophie.turner@email.com', phone: '+1 555-0118', idNumber: 'P88888888', status: 'cancelled', createdAt: '2024-01-12', guestType: 'reservation-linked' },
  { id: '19', name: 'James Wilson', email: 'james.wilson@email.com', phone: '+1 555-0119', idNumber: 'P99999999', status: 'checked-out', createdAt: '2024-01-14', guestType: 'reservation-linked' },
  { id: '20', name: 'Emma Stone', email: 'emma.stone@email.com', phone: '+1 555-0120', idNumber: 'P10101010', status: 'checked-in', createdAt: '2024-01-18', guestType: 'reservation-linked', vipLevel: 'vvip', notes: 'Celebrity - discretion required' },
  { id: '21', name: 'Carlos Rodriguez', email: 'carlos.r@email.com', phone: '+1 555-0121', idNumber: 'P11112222', status: 'reserved', createdAt: '2024-01-21', guestType: 'reservation-linked' },
  { id: '22', name: 'Natalie Chen', email: 'natalie.chen@email.com', phone: '+1 555-0122', idNumber: 'P22223333', status: 'reserved', createdAt: '2024-01-22', guestType: 'reservation-linked', notes: 'Honeymoon couple' },
];

export const bookings: Booking[] = [
  // === DECEMBER 2025 - Checked-out, No-show, Cancelled ===
  { id: '1', rsvpNo: 'RSV-2025-001', guestId: '8', roomId: '1', checkIn: '2025-12-01', checkOut: '2025-12-05', status: 'checked-out', type: 'reservation', mode: 'individual', totalAmount: 356, adults: 1, children: 0, roomCount: 1, eta: '14:00', rateSource: 'Direct', depositAmount: 150, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2025-11-25' },
  { id: '2', rsvpNo: 'RSV-2025-002', guestId: '4', roomId: '5', checkIn: '2025-12-05', checkOut: '2025-12-10', status: 'checked-out', type: 'walk-in', mode: 'individual', totalAmount: 745, adults: 2, children: 0, roomCount: 1, eta: '15:00', rateSource: 'Walk-in', depositAmount: 300, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2025-12-05' },
  { id: '3', rsvpNo: 'RSV-2025-003', guestId: '11', roomId: '3', checkIn: '2025-12-08', checkOut: '2025-12-12', status: 'checked-out', type: 'reservation', mode: 'individual', totalAmount: 516, adults: 2, children: 0, roomCount: 1, eta: '12:00', rateSource: 'Direct', depositAmount: 200, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2025-12-01' },
  { id: '4', rsvpNo: 'RSV-2025-004', guestId: '13', roomId: '6', checkIn: '2025-12-10', checkOut: '2025-12-15', status: 'checked-out', type: 'reservation', mode: 'individual', totalAmount: 1245, adults: 2, children: 1, roomCount: 1, eta: '14:00', rateSource: 'Corporate Rate', depositAmount: 500, createdBy: 'Sales', isNonRefundable: false, rnw: 0, createdAt: '2025-12-03' },
  { id: '5', rsvpNo: 'RSV-2025-005', guestId: '17', roomId: '2', checkIn: '2025-12-12', checkOut: '2025-12-16', status: 'no-show', type: 'reservation', mode: 'individual', totalAmount: 356, adults: 1, children: 0, roomCount: 1, eta: '15:00', rateSource: 'OTA-Expedia', depositAmount: 100, createdBy: 'Reservations', isNonRefundable: false, rnw: 0, createdAt: '2025-12-05' },
  { id: '6', rsvpNo: 'RSV-2025-006', guestId: '18', roomId: '2', checkIn: '2025-12-15', checkOut: '2025-12-20', status: 'cancelled', type: 'reservation', mode: 'individual', totalAmount: 445, adults: 1, children: 0, roomCount: 1, eta: '14:00', rateSource: 'Direct', depositAmount: 100, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2025-12-08' },
  { id: '7', rsvpNo: 'RSV-2025-007', guestId: '16', roomId: '9', checkIn: '2025-12-18', checkOut: '2025-12-23', status: 'checked-out', type: 'reservation', mode: 'individual', totalAmount: 1745, adults: 2, children: 2, roomCount: 1, eta: '14:00', rateSource: 'Direct', depositAmount: 700, createdBy: 'Reservations', isNonRefundable: false, rnw: 0, createdAt: '2025-12-10' },
  { id: '8', rsvpNo: 'RSV-2025-008', guestId: '19', roomId: '10', checkIn: '2025-12-20', checkOut: '2025-12-26', status: 'checked-out', type: 'reservation', mode: 'group', totalAmount: 2094, adults: 4, children: 0, roomCount: 1, eta: '13:00', groupName: 'Holiday Group', rateSource: 'Direct', depositAmount: 800, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2025-12-12' },
  { id: '9', rsvpNo: 'RSV-2025-009', guestId: '14', roomId: '8', checkIn: '2025-12-22', checkOut: '2025-12-27', status: 'checked-out', type: 'walk-in', mode: 'individual', totalAmount: 745, adults: 2, children: 0, roomCount: 1, eta: '16:00', rateSource: 'Walk-in', depositAmount: 300, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2025-12-22' },
  { id: '10', rsvpNo: 'RSV-2025-010', guestId: '4', roomId: '1', checkIn: '2025-12-28', checkOut: '2026-01-02', status: 'checked-out', type: 'reservation', mode: 'individual', totalAmount: 445, adults: 1, children: 0, roomCount: 1, eta: '14:00', rateSource: 'Direct', depositAmount: 200, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2025-12-20' },

  // === JANUARY 2026 - Mix of all statuses ===
  { id: '11', rsvpNo: 'RSV-2026-001', guestId: '1', roomId: '2', checkIn: '2026-01-03', checkOut: '2026-01-08', status: 'checked-out', type: 'reservation', mode: 'individual', totalAmount: 445, adults: 2, children: 0, roomCount: 1, eta: '14:00', rateSource: 'Direct', depositAmount: 200, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2025-12-27' },
  { id: '12', rsvpNo: 'RSV-2026-002', guestId: '8', roomId: '5', checkIn: '2026-01-05', checkOut: '2026-01-10', status: 'checked-out', type: 'reservation', mode: 'individual', totalAmount: 745, adults: 1, children: 1, roomCount: 1, eta: '15:00', rateSource: 'OTA-Booking', depositAmount: 300, createdBy: 'Reservations', isNonRefundable: true, rnw: 0, createdAt: '2025-12-28' },
  { id: '13', rsvpNo: 'RSV-2026-003', guestId: '11', roomId: '6', checkIn: '2026-01-08', checkOut: '2026-01-12', status: 'checked-out', type: 'reservation', mode: 'individual', totalAmount: 996, adults: 2, children: 0, roomCount: 1, eta: '12:00', rateSource: 'Direct', depositAmount: 400, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2026-01-02' },
  { id: '14', rsvpNo: 'RSV-2026-004', guestId: '12', roomId: '1', checkIn: '2026-01-10', checkOut: '2026-01-14', status: 'checked-out', type: 'reservation', mode: 'individual', totalAmount: 356, adults: 1, children: 0, roomCount: 1, eta: '10:00', rateSource: 'Direct', depositAmount: 150, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2026-01-05', specialRequests: 'Quiet room requested' },
  { id: '15', rsvpNo: 'RSV-2026-005', guestId: '2', roomId: '5', checkIn: '2026-01-12', checkOut: '2026-01-17', status: 'checked-in', type: 'walk-in', mode: 'individual', totalAmount: 745, adults: 1, children: 1, roomCount: 1, eta: '15:45', rateSource: 'Walk-in', depositAmount: 300, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2026-01-12' },
  { id: '16', rsvpNo: 'RSV-2026-006', guestId: '5', roomId: '8', checkIn: '2026-01-14', checkOut: '2026-01-19', status: 'checked-in', type: 'walk-in', mode: 'individual', totalAmount: 745, adults: 2, children: 0, roomCount: 1, eta: '12:00', rateSource: 'Walk-in', depositAmount: 300, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2026-01-14' },
  { id: '17', rsvpNo: 'RSV-2026-007', guestId: '7', roomId: '10', checkIn: '2026-01-15', checkOut: '2026-01-20', status: 'checked-in', type: 'reservation', mode: 'tour-series', totalAmount: 1745, adults: 4, children: 0, roomCount: 2, eta: '13:00', groupName: 'Tour Package A', rateSource: 'Tour Operator', depositAmount: 700, createdBy: 'Tour Desk', isNonRefundable: true, rnw: 0, createdAt: '2026-01-08' },
  { id: '18', rsvpNo: 'RSV-2026-008', guestId: '20', roomId: '6', checkIn: '2026-01-16', checkOut: '2026-01-21', status: 'checked-in', type: 'reservation', mode: 'individual', totalAmount: 1245, adults: 2, children: 0, roomCount: 1, eta: '11:00', rateSource: 'Direct', depositAmount: 500, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2026-01-10', specialRequests: 'VIP - Privacy required' },
  { id: '19', rsvpNo: 'RSV-2026-009', guestId: '12', roomId: '1', checkIn: '2026-01-16', checkOut: '2026-01-20', status: 'checked-in', type: 'reservation', mode: 'individual', totalAmount: 356, adults: 1, children: 0, roomCount: 1, eta: '10:00', rateSource: 'Direct', depositAmount: 150, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2026-01-10', specialRequests: 'Returning guest - same room requested' },
  { id: '20', rsvpNo: 'RSV-2026-010', guestId: '1', roomId: '2', checkIn: '2026-01-17', checkOut: '2026-01-22', status: 'checked-in', type: 'reservation', mode: 'individual', totalAmount: 445, adults: 2, children: 0, roomCount: 1, eta: '14:00', rateSource: 'Direct', depositAmount: 200, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2026-01-12' },
  { id: '21', rsvpNo: 'RSV-2026-011', guestId: '3', roomId: '6', checkIn: '2026-01-22', checkOut: '2026-01-26', status: 'confirmed', type: 'reservation', mode: 'group', totalAmount: 996, adults: 2, children: 1, roomCount: 2, eta: '16:00', groupName: 'ABC Travel Group', rateSource: 'OTA-Booking', depositAmount: 400, createdBy: 'Reservations', isNonRefundable: true, rnw: 0, createdAt: '2026-01-15', specialRequests: 'Late check-in requested' },
  { id: '22', rsvpNo: 'RSV-2026-012', guestId: '15', roomId: '1', checkIn: '2026-01-24', checkOut: '2026-01-28', status: 'confirmed', type: 'reservation', mode: 'individual', totalAmount: 356, adults: 1, children: 0, roomCount: 1, eta: '14:00', rateSource: 'Direct', depositAmount: 150, createdBy: 'Reservations', isNonRefundable: false, rnw: 0, createdAt: '2026-01-18' },
  { id: '23', rsvpNo: 'RSV-2026-013', guestId: '6', roomId: '9', checkIn: '2026-01-25', checkOut: '2026-01-30', status: 'confirmed', type: 'reservation', mode: 'block', totalAmount: 1745, adults: 2, children: 2, roomCount: 3, eta: '14:00', groupName: 'Corporate Event', rateSource: 'Corporate Rate', depositAmount: 700, createdBy: 'Sales', isNonRefundable: false, rnw: 2, createdAt: '2026-01-18', specialRequests: 'Champagne and flowers in room' },

  // === FEBRUARY 2026 - Confirmed reservations ===
  { id: '24', rsvpNo: 'RSV-2026-014', guestId: '21', roomId: '2', checkIn: '2026-02-01', checkOut: '2026-02-05', status: 'confirmed', type: 'reservation', mode: 'individual', totalAmount: 356, adults: 1, children: 0, roomCount: 1, eta: '14:00', rateSource: 'Direct', depositAmount: 150, createdBy: 'Reservations', isNonRefundable: false, rnw: 0, createdAt: '2026-01-25' },
  { id: '25', rsvpNo: 'RSV-2026-015', guestId: '22', roomId: '6', checkIn: '2026-02-05', checkOut: '2026-02-10', status: 'confirmed', type: 'reservation', mode: 'individual', totalAmount: 1245, adults: 2, children: 0, roomCount: 1, eta: '14:00', rateSource: 'Direct', depositAmount: 500, createdBy: 'Reservations', isNonRefundable: false, rnw: 0, createdAt: '2026-01-28', specialRequests: 'Honeymoon package - champagne & roses' },
  { id: '26', rsvpNo: 'RSV-2026-016', guestId: '9', roomId: '10', checkIn: '2026-02-08', checkOut: '2026-02-12', status: 'confirmed', type: 'reservation', mode: 'individual', totalAmount: 1396, adults: 2, children: 0, roomCount: 1, eta: '12:00', rateSource: 'Direct', depositAmount: 500, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2026-02-01' },
  { id: '27', rsvpNo: 'RSV-2026-017', guestId: '10', roomId: '9', checkIn: '2026-02-10', checkOut: '2026-02-15', status: 'confirmed', type: 'reservation', mode: 'individual', totalAmount: 1745, adults: 3, children: 1, roomCount: 1, eta: '15:00', rateSource: 'Direct', depositAmount: 700, createdBy: 'Reservations', isNonRefundable: false, rnw: 0, createdAt: '2026-02-03' },
  { id: '28', rsvpNo: 'RSV-2026-018', guestId: '15', roomId: '3', checkIn: '2026-02-12', checkOut: '2026-02-16', status: 'confirmed', type: 'reservation', mode: 'individual', totalAmount: 516, adults: 2, children: 0, roomCount: 1, eta: '15:00', rateSource: 'Direct', depositAmount: 200, createdBy: 'Front Desk', isNonRefundable: false, rnw: 0, createdAt: '2026-02-05', specialRequests: 'Early check-in if possible' },
  { id: '29', rsvpNo: 'RSV-2026-019', guestId: '3', roomId: '5', checkIn: '2026-02-14', checkOut: '2026-02-18', status: 'confirmed', type: 'reservation', mode: 'individual', totalAmount: 596, adults: 2, children: 0, roomCount: 1, eta: '14:00', rateSource: 'OTA-Booking', depositAmount: 250, createdBy: 'Reservations', isNonRefundable: true, rnw: 0, createdAt: '2026-02-07' },
  { id: '30', rsvpNo: 'RSV-2026-020', guestId: '6', roomId: '6', checkIn: '2026-02-18', checkOut: '2026-02-22', status: 'confirmed', type: 'reservation', mode: 'individual', totalAmount: 996, adults: 2, children: 0, roomCount: 1, eta: '14:00', rateSource: 'Direct', depositAmount: 400, createdBy: 'Reservations', isNonRefundable: false, rnw: 0, createdAt: '2026-02-10', specialRequests: 'VIP guest - anniversary trip' },
];

export const activities: Activity[] = [
  { id: '1', type: 'check-in', description: 'John Smith checked in to Room 102', timestamp: '2024-01-20T14:30:00' },
  { id: '2', type: 'guest-request', description: 'Room 201 requested extra towels', timestamp: '2024-01-20T13:45:00' },
  { id: '3', type: 'booking', description: 'New booking created for Jennifer Lee', timestamp: '2024-01-20T12:15:00' },
  { id: '4', type: 'lost-item', description: 'Guest reported lost wallet in lobby', timestamp: '2024-01-20T11:30:00' },
  { id: '5', type: 'check-out', description: 'Lisa Anderson checked out from Room 101', timestamp: '2024-01-20T10:00:00' },
  { id: '6', type: 'found-item', description: 'Staff found sunglasses in Room 302', timestamp: '2024-01-20T09:15:00' },
  { id: '7', type: 'check-in', description: 'Emily Johnson checked in to Room 201', timestamp: '2024-01-19T15:45:00' },
  { id: '8', type: 'guest-request', description: 'Room 302 requested maintenance for AC', timestamp: '2024-01-19T14:00:00' },
  { id: '9', type: 'booking', description: 'New booking created for Michael Brown', timestamp: '2024-01-19T09:30:00' },
  { id: '10', type: 'item-returned', description: 'Returned laptop to guest John Smith', timestamp: '2024-01-18T17:00:00' },
  { id: '11', type: 'cancellation', description: 'Booking cancelled for Peter Thomas', timestamp: '2024-01-18T16:20:00' },
];

export const dashboardStats: DashboardStats = {
  totalRooms: 12,
  occupiedRooms: 5,
  availableRooms: 5,
  todayCheckIns: 3,
  todayCheckOuts: 2,
  monthlyRevenue: 28450,
  occupancyRate: 42,
};

export const weeklyOccupancy = [
  { day: 'Mon', occupancy: 65 },
  { day: 'Tue', occupancy: 58 },
  { day: 'Wed', occupancy: 72 },
  { day: 'Thu', occupancy: 80 },
  { day: 'Fri', occupancy: 92 },
  { day: 'Sat', occupancy: 95 },
  { day: 'Sun', occupancy: 78 },
];

export const monthlyRevenue = [
  { month: 'Jan', revenue: 28450 },
  { month: 'Feb', revenue: 32100 },
  { month: 'Mar', revenue: 35800 },
  { month: 'Apr', revenue: 29200 },
  { month: 'May', revenue: 41500 },
  { month: 'Jun', revenue: 45200 },
];

export const roomTypeDistribution = [
  { type: 'Single', count: 2, fill: 'hsl(var(--primary))' },
  { type: 'Double', count: 4, fill: 'hsl(var(--info))' },
  { type: 'Suite', count: 3, fill: 'hsl(var(--success))' },
  { type: 'Deluxe', count: 3, fill: 'hsl(var(--warning))' },
];

// Service Catalog
export const serviceItems: ServiceItem[] = [
  { id: '1', name: 'Room Service - Breakfast', category: 'restaurant', price: 25, description: 'Continental breakfast delivered to room', isActive: true },
  { id: '2', name: 'Room Service - Lunch', category: 'restaurant', price: 35, description: 'Full lunch menu available', isActive: true },
  { id: '3', name: 'Room Service - Dinner', category: 'restaurant', price: 45, description: 'Full dinner menu available', isActive: true },
  { id: '4', name: 'Minibar - Soft Drinks', category: 'minibar', price: 5, description: 'Assorted soft drinks', isActive: true },
  { id: '5', name: 'Minibar - Alcoholic Beverages', category: 'minibar', price: 12, description: 'Wine, beer, spirits', isActive: true },
  { id: '6', name: 'Minibar - Snacks', category: 'minibar', price: 8, description: 'Chips, nuts, chocolates', isActive: true },
  { id: '7', name: 'Spa - Swedish Massage', category: 'spa', price: 120, description: '60-minute relaxation massage', isActive: true },
  { id: '8', name: 'Spa - Deep Tissue Massage', category: 'spa', price: 150, description: '60-minute therapeutic massage', isActive: true },
  { id: '9', name: 'Spa - Facial Treatment', category: 'spa', price: 80, description: 'Rejuvenating facial', isActive: true },
  { id: '10', name: 'Laundry - Standard', category: 'laundry', price: 15, description: 'Next day return', isActive: true },
  { id: '11', name: 'Laundry - Express', category: 'laundry', price: 30, description: 'Same day return', isActive: true },
  { id: '12', name: 'Dry Cleaning', category: 'laundry', price: 25, description: 'Professional dry cleaning', isActive: true },
  { id: '13', name: 'Parking - Daily', category: 'parking', price: 20, description: 'Covered parking per day', isActive: true },
  { id: '14', name: 'Parking - Valet', category: 'parking', price: 35, description: 'Valet parking service', isActive: true },
  { id: '15', name: 'Late Checkout', category: 'other', price: 50, description: 'Checkout extended to 3 PM', isActive: true },
  { id: '16', name: 'Early Check-in', category: 'other', price: 50, description: 'Check-in from 9 AM', isActive: true },
  { id: '17', name: 'Extra Bed', category: 'room', price: 40, description: 'Additional bed in room', isActive: true },
  { id: '18', name: 'Baby Crib', category: 'room', price: 0, description: 'Complimentary baby crib', isActive: true },
];

// Companies
export const companies: Company[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    address: '123 Business Ave, New York, NY 10001',
    phone: '+1 555-0100',
    email: 'billing@acme.com',
    taxId: 'TX-123456789',
    corporateAccountId: 'CORP-001',
    billingContact: 'Jane Smith',
    contractedRate: 15,
    creditLimit: 50000,
    paymentTerms: 'Net 30',
    isActive: true,
    createdAt: '2024-01-01',
    notes: 'Long-term corporate partner'
  },
  {
    id: '2',
    name: 'Global Tech Inc',
    address: '456 Innovation Drive, San Francisco, CA 94105',
    phone: '+1 555-0200',
    email: 'travel@globaltech.com',
    taxId: 'TX-987654321',
    corporateAccountId: 'CORP-002',
    billingContact: 'Bob Johnson',
    contractedRate: 10,
    creditLimit: 75000,
    paymentTerms: 'Net 45',
    isActive: true,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Summit Consulting Group',
    address: '789 Tower Plaza, Chicago, IL 60601',
    phone: '+1 555-0300',
    email: 'accounts@summitcg.com',
    taxId: 'TX-555666777',
    corporateAccountId: 'CORP-003',
    billingContact: 'Sarah Williams',
    contractedRate: 12,
    creditLimit: 30000,
    paymentTerms: 'Net 30',
    isActive: true,
    createdAt: '2024-02-15'
  },
  {
    id: '4',
    name: 'Pacific Trading Co',
    address: '321 Harbor Blvd, Los Angeles, CA 90012',
    phone: '+1 555-0400',
    email: 'finance@pacifictrading.com',
    taxId: 'TX-888999000',
    corporateAccountId: 'CORP-004',
    billingContact: 'Michael Chen',
    contractedRate: 8,
    creditLimit: 25000,
    paymentTerms: 'Net 15',
    isActive: true,
    createdAt: '2024-03-01'
  },
  {
    id: '5',
    name: 'Meridian Healthcare',
    address: '555 Medical Center Dr, Boston, MA 02115',
    phone: '+1 555-0500',
    email: 'corporate@meridianhc.com',
    taxId: 'TX-111222333',
    corporateAccountId: 'CORP-005',
    billingContact: 'Dr. Emily Rodriguez',
    contractedRate: 20,
    creditLimit: 100000,
    paymentTerms: 'Net 60',
    isActive: true,
    createdAt: '2024-01-20',
    notes: 'Medical conference preferred partner'
  },
  {
    id: '6',
    name: 'Inactive Corp',
    address: '999 Old Street, Miami, FL 33101',
    phone: '+1 555-0600',
    email: 'old@inactivecorp.com',
    taxId: 'TX-000111222',
    corporateAccountId: 'CORP-006',
    billingContact: 'John Doe',
    isActive: false,
    createdAt: '2023-06-01',
    notes: 'Contract ended'
  }
];

// Deposits
export const deposits: Deposit[] = [
  // Existing deposits
  { id: '1', bookingId: '1', guestId: '1', amount: 200, status: 'applied', paymentMethod: 'credit-card', receivedAt: '2024-01-15T10:00:00', appliedAt: '2024-01-20T14:30:00' },
  { id: '2', bookingId: '2', guestId: '2', amount: 300, status: 'received', paymentMethod: 'cash', receivedAt: '2024-01-19T15:00:00' },
  { id: '3', bookingId: '3', guestId: '3', amount: 350, status: 'pending', paymentMethod: 'bank-transfer', notes: 'Awaiting bank confirmation' },
  { id: '4', bookingId: '5', guestId: '5', amount: 150, status: 'received', paymentMethod: 'debit-card', receivedAt: '2024-01-21T09:00:00' },
  { id: '5', bookingId: '6', guestId: '6', amount: 500, status: 'received', paymentMethod: 'credit-card', receivedAt: '2024-01-19T11:00:00' },
  { id: '6', bookingId: '7', guestId: '7', amount: 400, status: 'applied', paymentMethod: 'online', receivedAt: '2024-01-20T08:00:00', appliedAt: '2024-01-22T14:00:00' },
  { id: '7', bookingId: '4', guestId: '4', amount: 250, status: 'refunded', paymentMethod: 'credit-card', receivedAt: '2024-01-05T10:00:00', refundedAt: '2024-01-15T16:00:00' },
  { id: '8', bookingId: '8', guestId: '8', amount: 200, status: 'forfeited', paymentMethod: 'cash', receivedAt: '2024-01-02T12:00:00', notes: 'No-show penalty applied' },
  // Room 102 - No-show & cancellation history
  { id: '9', bookingId: '9', guestId: '17', amount: 100, status: 'forfeited', paymentMethod: 'credit-card', receivedAt: '2024-01-05T14:00:00', notes: 'No-show - deposit forfeited' },
  { id: '10', bookingId: '10', guestId: '18', amount: 100, status: 'refunded', paymentMethod: 'credit-card', receivedAt: '2024-01-08T10:00:00', refundedAt: '2024-01-12T15:00:00', notes: 'Cancelled within policy' },
  { id: '11', bookingId: '11', guestId: '19', amount: 89, status: 'applied', paymentMethod: 'cash', receivedAt: '2024-01-17T18:00:00', appliedAt: '2024-01-19T11:00:00' },
  { id: '12', bookingId: '24', guestId: '21', amount: 150, status: 'pending', paymentMethod: 'bank-transfer', notes: 'Awaiting confirmation' },
  // Room 103 - Same-day turnover
  { id: '13', bookingId: '12', guestId: '13', amount: 129, status: 'applied', paymentMethod: 'credit-card', receivedAt: '2024-01-10T09:00:00', appliedAt: '2024-01-18T12:00:00' },
  { id: '14', bookingId: '13', guestId: '14', amount: 200, status: 'applied', paymentMethod: 'debit-card', receivedAt: '2024-01-18T14:30:00', appliedAt: '2024-01-22T10:00:00' },
  { id: '15', bookingId: '14', guestId: '15', amount: 129, status: 'received', paymentMethod: 'credit-card', receivedAt: '2024-01-18T16:00:00' },
  // Room 202 - High-turnover suite
  { id: '16', bookingId: '16', guestId: '16', amount: 500, status: 'applied', paymentMethod: 'credit-card', receivedAt: '2024-01-01T10:00:00', appliedAt: '2024-01-10T12:00:00' },
  { id: '17', bookingId: '17', guestId: '9', amount: 249, status: 'applied', paymentMethod: 'online', receivedAt: '2024-01-05T15:00:00', appliedAt: '2024-01-12T11:00:00' },
  { id: '18', bookingId: '18', guestId: '10', amount: 600, status: 'applied', paymentMethod: 'bank-transfer', receivedAt: '2024-01-08T09:00:00', appliedAt: '2024-01-20T10:00:00' },
  { id: '19', bookingId: '19', guestId: '20', amount: 500, status: 'received', paymentMethod: 'credit-card', receivedAt: '2024-01-15T14:00:00' },
  { id: '20', bookingId: '25', guestId: '22', amount: 500, status: 'pending', paymentMethod: 'credit-card', notes: 'Honeymoon booking - pending' },
  // Room 101 - Full history
  { id: '21', bookingId: '20', guestId: '11', amount: 150, status: 'applied', paymentMethod: 'credit-card', receivedAt: '2024-01-08T11:00:00', appliedAt: '2024-01-16T10:00:00' },
  { id: '22', bookingId: '21', guestId: '12', amount: 89, status: 'applied', paymentMethod: 'debit-card', receivedAt: '2024-01-14T16:00:00', appliedAt: '2024-01-20T09:00:00' },
  { id: '23', bookingId: '22', guestId: '12', amount: 89, status: 'received', paymentMethod: 'credit-card', receivedAt: '2024-01-18T10:00:00' },
  { id: '24', bookingId: '23', guestId: '15', amount: 89, status: 'pending', paymentMethod: 'bank-transfer', notes: 'Future reservation' },
];

// Folios with transactions
export const folioTransactions: FolioTransaction[] = [
  // Folio 1 - John Smith (Room 102)
  { id: 't1', folioId: 'f1', type: 'charge', category: 'room', description: 'Room 102 - 5 nights', amount: 445, createdAt: '2024-01-20T14:30:00' },
  { id: 't2', folioId: 'f1', type: 'charge', category: 'restaurant', description: 'Room Service - Breakfast', amount: 25, createdAt: '2024-01-21T08:00:00' },
  { id: 't3', folioId: 'f1', type: 'charge', category: 'minibar', description: 'Minibar - Soft Drinks', amount: 15, createdAt: '2024-01-21T22:00:00' },
  { id: 't4', folioId: 'f1', type: 'deposit-applied', description: 'Deposit Applied', amount: -200, createdAt: '2024-01-20T14:30:00' },
  
  // Folio 2 - Emily Johnson (Room 201)
  { id: 't5', folioId: 'f2', type: 'charge', category: 'room', description: 'Room 201 - 4 nights', amount: 596, createdAt: '2024-01-19T15:45:00' },
  { id: 't6', folioId: 'f2', type: 'charge', category: 'spa', description: 'Spa - Swedish Massage', amount: 120, createdAt: '2024-01-20T14:00:00' },
  { id: 't7', folioId: 'f2', type: 'charge', category: 'laundry', description: 'Laundry - Express', amount: 30, createdAt: '2024-01-20T09:00:00' },
  { id: 't8', folioId: 'f2', type: 'payment', description: 'Cash Payment', amount: -300, paymentMethod: 'cash', createdAt: '2024-01-20T16:00:00' },
  
  // Folio 3 - Robert Wilson (Room 204)
  { id: 't9', folioId: 'f3', type: 'charge', category: 'room', description: 'Room 204 - 3 nights', amount: 447, createdAt: '2024-01-21T12:00:00' },
  { id: 't10', folioId: 'f3', type: 'charge', category: 'parking', description: 'Parking - Daily x3', amount: 60, createdAt: '2024-01-21T12:00:00' },
  { id: 't11', folioId: 'f3', type: 'deposit-applied', description: 'Deposit Applied', amount: -150, createdAt: '2024-01-21T12:00:00' },
  
  // Folio 4 - David Martinez (Room 302)
  { id: 't12', folioId: 'f4', type: 'charge', category: 'room', description: 'Room 302 - 5 nights', amount: 1745, createdAt: '2024-01-22T14:00:00' },
  { id: 't13', folioId: 'f4', type: 'charge', category: 'restaurant', description: 'Room Service - Dinner', amount: 90, createdAt: '2024-01-22T20:00:00' },
  { id: 't14', folioId: 'f4', type: 'charge', category: 'minibar', description: 'Minibar - Alcoholic Beverages', amount: 36, createdAt: '2024-01-23T23:00:00' },
  { id: 't15', folioId: 'f4', type: 'deposit-applied', description: 'Deposit Applied', amount: -400, createdAt: '2024-01-22T14:00:00' },
  { id: 't16', folioId: 'f4', type: 'payment', description: 'Credit Card Payment', amount: -500, paymentMethod: 'credit-card', createdAt: '2024-01-23T10:00:00' },
];

export const folios: Folio[] = [
  {
    id: 'f1',
    bookingId: '1',
    guestId: '1',
    roomId: '2',
    transactions: folioTransactions.filter(t => t.folioId === 'f1'),
    totalCharges: 485,
    totalPayments: 200,
    balance: 285,
    status: 'open',
    createdAt: '2024-01-20T14:30:00',
  },
  {
    id: 'f2',
    bookingId: '2',
    guestId: '2',
    roomId: '5',
    transactions: folioTransactions.filter(t => t.folioId === 'f2'),
    totalCharges: 746,
    totalPayments: 300,
    balance: 446,
    status: 'open',
    createdAt: '2024-01-19T15:45:00',
  },
  {
    id: 'f3',
    bookingId: '5',
    guestId: '5',
    roomId: '8',
    transactions: folioTransactions.filter(t => t.folioId === 'f3'),
    totalCharges: 507,
    totalPayments: 150,
    balance: 357,
    status: 'open',
    createdAt: '2024-01-21T12:00:00',
  },
  {
    id: 'f4',
    bookingId: '7',
    guestId: '7',
    roomId: '10',
    transactions: folioTransactions.filter(t => t.folioId === 'f4'),
    totalCharges: 1871,
    totalPayments: 900,
    balance: 971,
    status: 'open',
    createdAt: '2024-01-22T14:00:00',
  },
];

// Guest Requests
export const guestRequests: GuestRequest[] = [
  { 
    id: 'gr1', 
    guestId: '1', 
    guestName: 'John Smith',
    roomNumber: '102', 
    category: 'housekeeping', 
    priority: 'medium', 
    status: 'pending', 
    title: 'Extra Towels', 
    description: 'Please bring 2 extra bath towels', 
    requestedAt: '2024-01-20T13:45:00' 
  },
  { 
    id: 'gr2', 
    guestId: '7', 
    guestName: 'David Martinez',
    roomNumber: '302', 
    category: 'maintenance', 
    priority: 'urgent', 
    status: 'in-progress', 
    title: 'AC Not Working', 
    description: 'Air conditioning is not cooling properly', 
    requestedAt: '2024-01-20T09:00:00',
    assignedTo: 'Mike Technician'
  },
  { 
    id: 'gr3', 
    guestId: '2', 
    guestName: 'Emily Johnson',
    roomNumber: '201', 
    category: 'room-service', 
    priority: 'high', 
    status: 'pending', 
    title: 'Breakfast Order', 
    description: 'Continental breakfast for 2, extra orange juice', 
    requestedAt: '2024-01-20T07:30:00' 
  },
  { 
    id: 'gr4', 
    guestId: '5', 
    guestName: 'Robert Wilson',
    roomNumber: '204', 
    category: 'wake-up', 
    priority: 'low', 
    status: 'pending', 
    title: 'Wake-up Call', 
    description: 'Wake-up call at 6:00 AM tomorrow', 
    requestedAt: '2024-01-20T21:00:00' 
  },
  { 
    id: 'gr5', 
    guestId: '1', 
    guestName: 'John Smith',
    roomNumber: '102', 
    category: 'concierge', 
    priority: 'medium', 
    status: 'completed', 
    title: 'Restaurant Reservation', 
    description: 'Table for 2 at Italian restaurant downtown, 7 PM', 
    requestedAt: '2024-01-19T14:00:00',
    completedAt: '2024-01-19T15:00:00',
    assignedTo: 'Front Desk'
  },
];

// Lost & Found Items
export const lostFoundItems: LostFoundItem[] = [
  {
    id: 'lf1',
    type: 'lost',
    status: 'reported',
    category: 'electronics',
    itemName: 'Black Wallet',
    description: 'Black leather wallet with credit cards and ID',
    location: 'Lobby',
    reportedDate: '2024-01-20T11:30:00',
    reportedBy: 'John Smith',
    guestId: '1',
    roomNumber: '102',
    contactInfo: '+1 555-0101'
  },
  {
    id: 'lf2',
    type: 'found',
    status: 'found',
    category: 'jewelry',
    itemName: 'Gold Earring',
    description: 'Single gold hoop earring',
    location: 'Room 201',
    reportedDate: '2024-01-19T10:00:00',
    reportedBy: 'Housekeeping Staff',
    storageLocation: 'Front Desk Safe'
  },
  {
    id: 'lf3',
    type: 'found',
    status: 'found',
    category: 'electronics',
    itemName: 'Ray-Ban Sunglasses',
    description: 'Black Ray-Ban aviator sunglasses',
    location: 'Room 302',
    reportedDate: '2024-01-20T09:15:00',
    reportedBy: 'Housekeeping Staff',
    storageLocation: 'Lost & Found Cabinet'
  },
  {
    id: 'lf4',
    type: 'lost',
    status: 'matched',
    category: 'electronics',
    itemName: 'MacBook Pro Laptop',
    description: '13-inch MacBook Pro, silver, with stickers',
    location: 'Restaurant',
    reportedDate: '2024-01-17T20:00:00',
    reportedBy: 'Emily Johnson',
    guestId: '2',
    roomNumber: '201',
    contactInfo: '+1 555-0102',
    matchedItemId: 'lf5'
  },
  {
    id: 'lf5',
    type: 'found',
    status: 'returned',
    category: 'electronics',
    itemName: 'MacBook Pro Laptop',
    description: '13-inch MacBook Pro found under table',
    location: 'Restaurant',
    reportedDate: '2024-01-17T21:00:00',
    reportedBy: 'Restaurant Staff',
    matchedItemId: 'lf4',
    returnedDate: '2024-01-18T09:00:00',
    storageLocation: 'Front Desk'
  },
  {
    id: 'lf6',
    type: 'lost',
    status: 'reported',
    category: 'bags',
    itemName: 'Brown Leather Handbag',
    description: 'Small brown leather handbag with shoulder strap',
    location: 'Pool Area',
    reportedDate: '2024-01-18T16:00:00',
    reportedBy: 'Sarah Davis',
    guestId: '4',
    contactInfo: '+1 555-0104'
  },
  {
    id: 'lf7',
    type: 'found',
    status: 'disposed',
    category: 'clothing',
    itemName: 'Blue Scarf',
    description: 'Light blue silk scarf',
    location: 'Lobby',
    reportedDate: '2024-01-01T12:00:00',
    reportedBy: 'Security Staff',
    storageLocation: 'Disposed after 30 days',
    notes: 'Unclaimed for 30 days'
  },
  {
    id: 'lf8',
    type: 'found',
    status: 'found',
    category: 'keys',
    itemName: 'Car Keys',
    description: 'Toyota car keys with remote fob',
    location: 'Parking Lot',
    reportedDate: '2024-01-19T18:00:00',
    reportedBy: 'Valet Staff',
    storageLocation: 'Security Office'
  },
];
