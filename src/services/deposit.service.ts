import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { DEPOSIT } from '@/constants/services';
import type {
  ApplyDepositRequest,
  CreateDepositRequest,
  DepositResponse,
  DepositsResponse,
  ForfeitDepositRequest,
  HoldDepositRequest,
  RefundDepositRequest,
} from '@/types/deposit';

import { GetData, GetDataById, Mutation } from '@/lib/query';

/**
 * Create a new deposit
 * @returns React Query mutation for creating a deposit
 */
export const createDeposit = (): UseMutationResult<
  AxiosResponse<DepositResponse>,
  unknown,
  CreateDepositRequest,
  unknown
> => {
  return Mutation<DepositResponse, CreateDepositRequest>({
    url: DEPOSIT.BASE,
    key: 'create-deposit',
    method: 'post',
  });
};

/**
 * Get a single deposit by ID
 * @param id - Deposit ID
 * @returns React Query result with single deposit
 */
export const getDepositById = (
  id: string | number,
): UseQueryResult<AxiosResponse<DepositResponse>> => {
  const option = {
    url: DEPOSIT.BASE,
    key: 'get-deposit',
  };

  return GetDataById<DepositResponse>(id, option);
};

/**
 * Get all deposits for a specific reservation
 * @param reservationId - Reservation ID
 * @returns React Query result with deposits list
 */
export const getDepositsByReservation = (
  reservationId: string | number,
): UseQueryResult<AxiosResponse<DepositsResponse>> => {
  const url = DEPOSIT.BY_RESERVATION.replace(':reservationId', String(reservationId));

  const option = {
    url,
    key: ['get-deposits-by-reservation', String(reservationId)],
    enabled: !!reservationId,
  };

  return GetData<DepositsResponse>(option);
};

/**
 * Get all deposits for a specific guest
 * @param guestId - Guest ID
 * @returns React Query result with deposits list
 */
export const getDepositsByGuest = (
  guestId: string | number,
): UseQueryResult<AxiosResponse<DepositsResponse>> => {
  const url = DEPOSIT.BY_GUEST.replace(':guestId', String(guestId));

  const option = {
    url,
    key: ['get-deposits-by-guest', String(guestId)],
    enabled: !!guestId,
  };

  return GetData<DepositsResponse>(option);
};

/**
 * Hold/secure a deposit
 * @param id - Deposit ID to hold
 * @returns React Query mutation for holding deposit
 */
export const holdDeposit = (
  id: string | number,
): UseMutationResult<AxiosResponse<DepositResponse>, unknown, HoldDepositRequest, unknown> => {
  const url = DEPOSIT.HOLD.replace(':id', String(id));

  return Mutation<DepositResponse, HoldDepositRequest>({
    url,
    key: ['hold-deposit', String(id)],
    method: 'patch',
  });
};

/**
 * Refund a deposit
 * @param id - Deposit ID to refund
 * @returns React Query mutation for refunding deposit
 */
export const refundDeposit = (
  id: string | number,
): UseMutationResult<AxiosResponse<DepositResponse>, unknown, RefundDepositRequest, unknown> => {
  const url = DEPOSIT.REFUND.replace(':id', String(id));

  return Mutation<DepositResponse, RefundDepositRequest>({
    url,
    key: ['refund-deposit', String(id)],
    method: 'patch',
  });
};

/**
 * Apply a deposit to a reservation
 * @param id - Deposit ID to apply
 * @returns React Query mutation for applying deposit
 */
export const applyDeposit = (
  id: string | number,
): UseMutationResult<AxiosResponse<DepositResponse>, unknown, ApplyDepositRequest, unknown> => {
  const url = DEPOSIT.APPLY.replace(':id', String(id));

  return Mutation<DepositResponse, ApplyDepositRequest>({
    url,
    key: ['apply-deposit', String(id)],
    method: 'patch',
  });
};

/**
 * Forfeit a deposit
 * @param id - Deposit ID to forfeit
 * @returns React Query mutation for forfeiting deposit
 */
export const forfeitDeposit = (
  id: string | number,
): UseMutationResult<AxiosResponse<DepositResponse>, unknown, ForfeitDepositRequest, unknown> => {
  const url = DEPOSIT.FORFEIT.replace(':id', String(id));

  return Mutation<DepositResponse, ForfeitDepositRequest>({
    url,
    key: ['forfeit-deposit', String(id)],
    method: 'patch',
  });
};
