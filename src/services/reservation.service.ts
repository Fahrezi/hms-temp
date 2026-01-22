import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { RESERVATION } from '@/constants/services';
import type {
  CheckInRequest,
  CheckOutRequest,
  CreateReservationRequest,
  ReservationResponse,
  ReservationsResponse,
} from '@/types/reservation';

import { GetData, GetDataById, Mutation } from '@/lib/query';

/**
 * Get all reservations with optional pagination
 * @param page - Page number for pagination (default: 1)
 * @returns React Query result with reservations list
 */
export const getReservations = (page = 1): UseQueryResult<AxiosResponse<ReservationsResponse>> => {
  const option = {
    url: RESERVATION.BASE,
    key: 'get-reservations',
    params: { page },
    enabled: page > 0,
  };

  return GetData<ReservationsResponse>(option);
};

/**
 * Get a single reservation by ID
 * @param id - Reservation ID
 * @returns React Query result with single reservation
 */
export const getReservationById = (
  id: string | number,
): UseQueryResult<AxiosResponse<ReservationResponse>> => {
  const option = {
    url: RESERVATION.BASE,
    key: 'get-reservation',
  };

  return GetDataById<ReservationResponse>(id, option);
};

/**
 * Create a new reservation
 * @returns React Query mutation for creating reservations
 */
export const createReservation = (): UseMutationResult<
  AxiosResponse<ReservationResponse>,
  unknown,
  CreateReservationRequest,
  unknown
> => {
  return Mutation<ReservationResponse, CreateReservationRequest>({
    url: RESERVATION.BASE,
    key: 'create-reservation',
    method: 'post',
  });
};

/**
 * Check in a reservation
 * @param id - Reservation ID to check in
 * @returns React Query mutation for checking in
 */
export const checkInReservation = (
  id: string | number,
): UseMutationResult<AxiosResponse<ReservationResponse>, unknown, CheckInRequest, unknown> => {
  const url = RESERVATION.CHECK_IN.replace(':id', String(id));

  return Mutation<ReservationResponse, CheckInRequest>({
    url,
    key: ['check-in-reservation', String(id)],
    method: 'patch',
  });
};

/**
 * Check out a reservation
 * @param id - Reservation ID to check out
 * @returns React Query mutation for checking out
 */
export const checkOutReservation = (
  id: string | number,
): UseMutationResult<AxiosResponse<ReservationResponse>, unknown, CheckOutRequest, unknown> => {
  const url = RESERVATION.CHECK_OUT.replace(':id', String(id));

  return Mutation<ReservationResponse, CheckOutRequest>({
    url,
    key: ['check-out-reservation', String(id)],
    method: 'patch',
  });
};

