import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { AVAILABILITY } from '@/constants/services';
import type {
  AvailableRoomsCountParams,
  AvailableRoomsCountResponse,
  BlockRoomRequest,
  BlockRoomResponse,
  CheckAvailabilityRequest,
  CheckAvailabilityResponse,
  OccupancyRateParams,
  OccupancyRateResponse,
  RoomAvailabilityParams,
  RoomAvailabilityResponse,
  UnblockRoomRequest,
} from '@/types/availability';

import { GetData, Mutation } from '@/lib/query';

/**
 * Check room availability for given criteria
 * @param params - Check availability parameters (checkIn, checkOut, roomType, etc.)
 * @returns React Query result with availability status
 */
export const checkAvailability = (
  params: CheckAvailabilityRequest,
): UseQueryResult<AxiosResponse<CheckAvailabilityResponse>> => {
  const option = {
    url: AVAILABILITY.CHECK,
    key: 'check-availability',
    params: params as unknown as Record<string, string | number | boolean>,
    enabled: !!params.checkIn && !!params.checkOut,
  };

  return GetData<CheckAvailabilityResponse>(option);
};

/**
 * Get room availability for specific room and date range
 * @param params - Room availability parameters (roomId, checkIn, checkOut)
 * @returns React Query result with room availability details
 */
export const getRoomAvailability = (
  params: RoomAvailabilityParams,
): UseQueryResult<AxiosResponse<RoomAvailabilityResponse>> => {
  const option = {
    url: AVAILABILITY.ROOM,
    key: 'get-room-availability',
    params: params as unknown as Record<string, string | number | boolean>,
    enabled: !!params.checkIn && !!params.checkOut,
  };

  return GetData<RoomAvailabilityResponse>(option);
};

/**
 * Get occupancy rate for a given period
 * @param params - Occupancy rate parameters (startDate, endDate, roomType)
 * @returns React Query result with occupancy rate data
 */
export const getOccupancyRate = (
  params: OccupancyRateParams,
): UseQueryResult<AxiosResponse<OccupancyRateResponse>> => {
  const option = {
    url: AVAILABILITY.OCCUPANCY_RATE,
    key: 'get-occupancy-rate',
    params: params as unknown as Record<string, string | number | boolean>,
    enabled: !!params.startDate && !!params.endDate,
  };

  return GetData<OccupancyRateResponse>(option);
};

/**
 * Get count of available rooms
 * @param params - Available rooms count parameters (date, roomType)
 * @returns React Query result with available rooms count
 */
export const getAvailableRoomsCount = (
  params?: AvailableRoomsCountParams,
): UseQueryResult<AxiosResponse<AvailableRoomsCountResponse>> => {
  const option = {
    url: AVAILABILITY.AVAILABLE_COUNT,
    key: 'get-available-rooms-count',
    params: params as unknown as Record<string, string | number | boolean>,
  };

  return GetData<AvailableRoomsCountResponse>(option);
};

/**
 * Block a room for a specific date range
 * @returns React Query mutation for blocking a room
 */
export const blockRoom = (): UseMutationResult<
  AxiosResponse<BlockRoomResponse>,
  unknown,
  BlockRoomRequest,
  unknown
> => {
  return Mutation<BlockRoomResponse, BlockRoomRequest>({
    url: AVAILABILITY.BLOCK,
    key: 'block-room',
    method: 'post',
  });
};

/**
 * Unblock a room for a specific date range
 * @returns React Query mutation for unblocking a room
 */
export const unblockRoom = (): UseMutationResult<
  AxiosResponse<BlockRoomResponse>,
  unknown,
  UnblockRoomRequest,
  unknown
> => {
  return Mutation<BlockRoomResponse, UnblockRoomRequest>({
    url: AVAILABILITY.UNBLOCK,
    key: 'unblock-room',
    method: 'post',
  });
};
