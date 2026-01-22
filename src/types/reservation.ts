export type Reservation = {
  id: number;
  guest_name: string;
  guest_email?: string;
  guest_phone?: string;
  room_number: string;
  room_type?: string;
  check_in_date: string;
  check_out_date: string;
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
  number_of_guests?: number;
  special_requests?: string;
  total_price?: number;
  created_at?: string;
  updated_at?: string;
};

export type CreateReservationRequest = {
  guest_name: string;
  guest_email?: string;
  guest_phone?: string;
  room_number: string;
  room_type?: string;
  check_in_date: string;
  check_out_date: string;
  number_of_guests?: number;
  special_requests?: string;
  total_price?: number;
};

export type CheckInRequest = {
  check_in_date?: string;
  notes?: string;
};

export type CheckOutRequest = {
  check_out_date?: string;
  notes?: string;
};

export type ReservationResponse = {
  data: Reservation;
  message?: string;
};

export type ReservationsResponse = {
  data: Reservation[];
  total_pages?: number;
  current_page?: number;
  total_count?: number;
};
