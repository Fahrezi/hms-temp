const USER_SERVICE = {
  BASE: '/users',
};

const AUTH_SERVICE = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
};

const RESERVATION = {
  BASE: '/reservations',
  CHECK_IN: '/reservations/:id/checkin',
  CHECK_OUT: '/reservations/:id/checkout',
};

const GUEST = {
  BASE: '/guests',
  CORPORATE: '/guests/corporate',
  SEARCH: '/guests/search',
};

const DEPOSIT = {
  BASE: '/deposits',
  BY_RESERVATION: '/deposits/reservation/:reservationId',
  BY_GUEST: '/deposits/guest/:guestId',
  HOLD: '/deposits/:id/hold',
  REFUND: '/deposits/:id/refund',
  APPLY: '/deposits/:id/apply',
  FORFEIT: '/deposits/:id/forfeit',
};

const ROOM = {
  BASE: '/rooms',
  BY_NUMBER: '/rooms/number/:number',
  BY_STATUS: '/rooms/status/:status',
  AVAILABLE: '/rooms/available',
  UPDATE_STATUS: '/rooms/:id/status',
  UPDATE_HOUSEKEEPING: '/rooms/:id/housekeeping',
};

const AVAILABILITY = {
  CHECK: '/availability/check',
  ROOM: '/availability/room',
  OCCUPANCY_RATE: '/availability/occupancy-rate',
  AVAILABLE_COUNT: '/availability/count',
  BLOCK: '/availability/block',
  UNBLOCK: '/availability/unblock',
};

export { USER_SERVICE, AUTH_SERVICE, RESERVATION, GUEST, DEPOSIT, ROOM, AVAILABILITY };
