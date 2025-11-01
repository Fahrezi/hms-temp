export type Reservation = {
  email: string;
  display_name: string;
  user_id: number;
  roles: string;
};

export type ReservationResponse = {
  user: Reservation;
};

type ReservationData = {
  data: Reservation[];
  total_pages: number;
};

export type UsersResponse = ReservationData;
