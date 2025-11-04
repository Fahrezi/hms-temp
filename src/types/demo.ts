export type Reservation = {
  rsvp_no: string;
  room_type: string;
  room_no: string | null;
  room_count: number;
  last_name: string;
  first_name: string;
  pax_adult: number;
  pax_child: number;
  arrival_date: string;     // e.g., "YYYY-MM-DD"
  departure_date: string;   // e.g., "YYYY-MM-DD"
  eta_by: string | null;
  voucher_no: string;
  group_name: string | null;
  rate_source: string;
  deposit_amount: number;
  sts: string;              // e.g., "O"
  us: string;               // e.g., "A"
  rsvp_type: string;        // e.g., "01"
  non_refundable: string;
  rnw: string;
};

export type Guest = {
  id: string;
  room_no: string;
  last_name: string;
  first_name: string;
  arrival: string;        // "YYYY-MM-DD"
  departure: string;      // "YYYY-MM-DD"
  rate_source: string;
  group: string;
  etd: string;            // "HH:mm"
  by: string;             // e.g., "Front Desk"
  sell_type: string;      // e.g., "Room Only"
  guest_type: string;     // e.g., "VIP"
  m_j: string;            // e.g., "01"
  adult: string;          // sample uses "2" (string)
  child: string;          // sample uses "0" (string)
  rsvp: string;           // e.g., "RS1P100679"
  type: string;           // e.g., "Confirmed"
  reg_no: string;         // e.g., "REG001"
  status: string;         // e.g., "check-in"
  balance: string;        // sample uses "0" (string)
};


export type DataDemoState = {
  reservations: Reservation[];
  guests: Guest[];
  isLoading?: boolean;
};

export type DataDemoAction = {
  type: 'ADD_RESERVATION' | 'ADD_GUEST' | 'RESTORE';
  payload: Partial<DataDemoState>;
}

export type DataDemoContextType = DataDemoState & {
  addReservation: (reservations: Reservation[]) => void;
  addGuestList: (guests: Guest[]) => void;
};