import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { GUEST } from '@/constants/services';
import type {
  CreateCorporateGuestRequest,
  CreateGuestRequest,
  GuestResponse,
  GuestsResponse,
  SearchGuestParams,
  UpdateGuestRequest,
} from '@/types/guest';

import { GetData, GetDataById, Mutation } from '@/lib/query';

/**
 * Create a new regular guest
 * @returns React Query mutation for creating a guest
 */
export const createGuest = (): UseMutationResult<
  AxiosResponse<GuestResponse>,
  unknown,
  CreateGuestRequest,
  unknown
> => {
  return Mutation<GuestResponse, CreateGuestRequest>({
    url: GUEST.BASE,
    key: 'create-guest',
    method: 'post',
  });
};

/**
 * Create a new corporate guest
 * @returns React Query mutation for creating a corporate guest
 */
export const createCorporateGuest = (): UseMutationResult<
  AxiosResponse<GuestResponse>,
  unknown,
  CreateCorporateGuestRequest,
  unknown
> => {
  return Mutation<GuestResponse, CreateCorporateGuestRequest>({
    url: GUEST.CORPORATE,
    key: 'create-corporate-guest',
    method: 'post',
  });
};

/**
 * Get a single guest by ID
 * @param id - Guest ID
 * @returns React Query result with single guest
 */
export const getGuestById = (
  id: string | number,
): UseQueryResult<AxiosResponse<GuestResponse>> => {
  const option = {
    url: GUEST.BASE,
    key: 'get-guest',
  };

  return GetDataById<GuestResponse>(id, option);
};

/**
 * Update an existing guest
 * @param id - Guest ID to update
 * @returns React Query mutation for updating guest
 */
export const updateGuest = (
  id: string | number,
): UseMutationResult<AxiosResponse<GuestResponse>, unknown, UpdateGuestRequest, unknown> => {
  const url = `${GUEST.BASE}/${id}`;

  return Mutation<GuestResponse, UpdateGuestRequest>({
    url,
    key: ['update-guest', String(id)],
    method: 'patch',
  });
};

/**
 * Search for guests with optional filters
 * @param params - Search parameters (name, email, phone, page)
 * @returns React Query result with filtered guests list
 */
export const searchGuests = (
  params: SearchGuestParams = {},
): UseQueryResult<AxiosResponse<GuestsResponse>> => {
  const option = {
    url: GUEST.SEARCH,
    key: 'search-guests',
    params,
    enabled: Object.keys(params).length > 0,
  };

  return GetData<GuestsResponse>(option);
};

/**
 * Delete a guest by ID
 * @param id - Guest ID to delete
 * @returns React Query mutation for deleting guest
 */
export const deleteGuest = (
  id: string | number,
): UseMutationResult<AxiosResponse<void>, unknown, void, unknown> => {
  const url = `${GUEST.BASE}/${id}`;

  return Mutation<undefined, undefined>({
    url,
    key: ['delete-guest', String(id)],
    method: 'delete',
  });
};
