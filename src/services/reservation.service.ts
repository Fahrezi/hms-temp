import type { UseQueryResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { RESERVATION } from '@/constants/services';
import { ReservationResponse } from '@/types/reservation';

import { GetData, GetDataById } from '@/libs/query';

export const getReservation = (page = 1): UseQueryResult<AxiosResponse<ReservationResponse>> => {
  const option = {
    url: `${RESERVATION.BASE}`,
    key: 'get-reservation',
  };

  return GetData<ReservationResponse>(option);
};

export const getReservationById = (id: string | number): UseQueryResult<AxiosResponse<ReservationResponse>> => {
  const option = {
    url: RESERVATION.BASE,
    key: 'get-reservation',
  };

  return GetDataById<ReservationResponse>(id, option);
};
