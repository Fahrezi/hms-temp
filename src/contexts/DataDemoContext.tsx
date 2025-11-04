import { createContext, type ReactNode, useCallback, useEffect, useReducer } from 'react';

import { decryptData, encryptData } from '@/utils/secureAuth';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { DataDemoAction, DataDemoContextType, DataDemoState, Guest, Reservation } from '@/types/demo';

const SEED_RESERVATION = [
  {
    "rsvp_no": "RS1P100679",
    "room_type": "SPRK",
    "room_no": null,
    "room_count": 1,
    "last_name": "ABDUL KADIR",
    "first_name": "AFIQ FAISAL",
    "pax_adult": 2,
    "pax_child": 0,
    "arrival_date": "2025-12-19",
    "departure_date": "2025-12-21",
    "eta_by": null,
    "voucher_no": "998237633996",
    "group_name": null,
    "rate_source": "TRIP.COM",
    "deposit_amount": 0,
    "sts": "O",
    "us": "A",
    "rsvp_type": "01",
    "non_refundable": "Refundable",
    "rnw": ""
  },
  {
    "rsvp_no": "RS1P060853",
    "room_type": "SPRK",
    "room_no": null,
    "room_count": 1,
    "last_name": "DEWI",
    "first_name": "NURMALA KUSUMA",
    "pax_adult": 2,
    "pax_child": 0,
    "arrival_date": "2025-10-20",
    "departure_date": "2025-10-21",
    "eta_by": null,
    "voucher_no": "48058897",
    "group_name": null,
    "rate_source": "TIKET.COM",
    "deposit_amount": 0,
    "sts": "O",
    "us": "A",
    "rsvp_type": "01",
    "non_refundable": 'No Refundable',
    "rnw": ""
  }
];

const SEED_GUEST = [
  {
    "id": '1',
    "room_no": "101",
    "last_name": "Smith",
    "first_name": "John",
    "arrival": "2025-11-04",
    "departure": "2025-11-07",
    "rate_source": "Agoda",
    "group": "Business",
    "etd": "18:00",
    "by": "Front Desk",
    "sell_type": "Room Only",
    "guest_type": "VIP",
    "m_j": "01",
    "adult": "2",
    "child": "0",
    "rsvp": "RS1P100679",
    "type": "Confirmed",
    "reg_no": "REG001",
    "status": "check-in",
    "balance": "0"
  },
  {
    "id": '2',
    "room_no": "202",
    "last_name": "Garcia",
    "first_name": "Maria",
    "arrival": "2025-11-05",
    "departure": "2025-11-08",
    "rate_source": "Booking.com",
    "group": "Family",
    "etd": "12:00",
    "by": "Online",
    "sell_type": "B&B",
    "guest_type": "Leisure",
    "m_j": "01",
    "adult": "2",
    "child": "1",
    "rsvp": "RS1P101234",
    "type": "Tentative",
    "reg_no": "REG002",
    "status": "check-out",
    "balance": "0"
  },
  {
    "id": '3',
    "room_no": "303",
    "last_name": "Tanaka",
    "first_name": "Hiroshi",
    "arrival": "2025-11-03",
    "departure": "2025-11-06",
    "rate_source": "Walk-in",
    "group": "-",
    "etd": "14:00",
    "by": "Front Desk",
    "sell_type": "Full Board",
    "guest_type": "Individual",
    "m_j": "01",
    "adult": "1",
    "child": "0",
    "rsvp": "RS1P102345",
    "type": "Checked In",
    "reg_no": "REG003",
    "status": "check-in",
    "balance": "0"
  }
];

const initialState: DataDemoState = {
  reservations: SEED_RESERVATION,
  guests: SEED_GUEST,
  isLoading: false
};

const demoReducer = (state: DataDemoState, action: DataDemoAction): DataDemoState => {
  switch (action.type) {
    case 'ADD_RESERVATION':
      return { ...state, ...action.payload};
    case 'ADD_GUEST':
      return { ...state, ...action.payload };
    case 'RESTORE':
      return { ...state, ...action.payload, isLoading: false };
    default:
      return state;
  }
};

const DataDemoContext = createContext<DataDemoContextType | undefined>(undefined);

export const DataDemoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(demoReducer, initialState);

  useEffect(() => {
    const storedData = getLocalStorage<string>('demo');
    if (storedData) {
      const parsedData = decryptData(storedData);
      if (parsedData) {
        dispatch({ type: 'RESTORE', payload: parsedData as DataDemoState });
      }
    } else {
      dispatch({ type: 'RESTORE', payload: initialState });
    }
  }, []);

  useEffect(() => {
    setLocalStorage('demo', encryptData(state as DataDemoState));
  }, [state]);

  const addReservations = useCallback((reservations: Reservation[]) => {
    dispatch({ type: 'ADD_RESERVATION', payload: { reservations: reservations } });
  }, []);

  const addGuests = useCallback((guests: Guest[]) => {
    dispatch({ type: 'ADD_GUEST', payload: { guests } });
  }, []);

  return <DataDemoContext.Provider value={{ ...state, addGuestList: addGuests, addReservation: addReservations }}>{children}</DataDemoContext.Provider>;
};

export default DataDemoContext;
