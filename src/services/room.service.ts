import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { ROOM } from '@/constants/services';
import type {
  CreateRoomRequest,
  ListAvailableRoomsParams,
  ListRoomsByStatusParams,
  RoomResponse,
  RoomsResponse,
  UpdateHousekeepingStatusRequest,
  UpdateRoomRequest,
  UpdateRoomStatusRequest,
} from '@/types/room';

import { GetData, GetDataById, Mutation } from '@/lib/query';

/**
 * Get all rooms with optional pagination
 * @param page - Page number for pagination (default: 1)
 * @param limit - Number of items per page
 * @returns React Query result with rooms list
 */
export const getRooms = (page = 1, limit = 10): UseQueryResult<AxiosResponse<RoomsResponse>> => {
  const option = {
    url: ROOM.BASE,
    key: 'get-rooms',
    params: { page, limit },
    enabled: page > 0,
  };

  return GetData<RoomsResponse>(option);
};

/**
 * Get a single room by ID
 * @param id - Room ID
 * @returns React Query result with single room
 */
export const getRoomById = (
  id: string | number,
): UseQueryResult<AxiosResponse<RoomResponse>> => {
  const option = {
    url: ROOM.BASE,
    key: 'get-room-by-id',
  };

  return GetDataById<RoomResponse>(id, option);
};

/**
 * Get a room by room number
 * @param number - Room number
 * @returns React Query result with single room
 */
export const getRoomByNumber = (
  number: string,
): UseQueryResult<AxiosResponse<RoomResponse>> => {
  const option = {
    url: ROOM.BY_NUMBER.replace(':number', number),
    key: 'get-room-by-number',
    enabled: !!number,
  };

  return GetData<RoomResponse>(option);
};

/**
 * List rooms by status
 * @param params - Query parameters including status and pagination
 * @returns React Query result with filtered rooms list
 */
export const listRoomsByStatus = (
  params: ListRoomsByStatusParams,
): UseQueryResult<AxiosResponse<RoomsResponse>> => {
  const option = {
    url: ROOM.BY_STATUS.replace(':status', params.status),
    key: 'list-rooms-by-status',
    params: { page: params.page || 1, limit: params.limit || 10 },
    enabled: !!params.status,
  };

  return GetData<RoomsResponse>(option);
};

/**
 * List available rooms with optional filters
 * @param params - Query parameters for filtering available rooms
 * @returns React Query result with available rooms list
 */
export const listAvailableRooms = (
  params?: ListAvailableRoomsParams,
): UseQueryResult<AxiosResponse<RoomsResponse>> => {
  const option = {
    url: ROOM.AVAILABLE,
    key: 'list-available-rooms',
    params: {
      checkIn: params?.checkIn,
      checkOut: params?.checkOut,
      roomType: params?.roomType,
      page: params?.page || 1,
      limit: params?.limit || 10,
    },
  };

  return GetData<RoomsResponse>(option);
};

/**
 * Create a new room
 * @returns React Query mutation for creating a room
 */
export const createRoom = (): UseMutationResult<
  AxiosResponse<RoomResponse>,
  unknown,
  CreateRoomRequest,
  unknown
> => {
  return Mutation<RoomResponse, CreateRoomRequest>({
    url: ROOM.BASE,
    key: 'create-room',
    method: 'post',
  });
};

/**
 * Update a room
 * @param id - Room ID to update
 * @returns React Query mutation for updating a room
 */
export const updateRoom = (
  id: string | number,
): UseMutationResult<
  AxiosResponse<RoomResponse>,
  unknown,
  UpdateRoomRequest,
  unknown
> => {
  return Mutation<RoomResponse, UpdateRoomRequest>({
    url: `${ROOM.BASE}/${id}`,
    key: 'update-room',
    method: 'put',
  });
};

/**
 * Update room status (PATCH)
 * @param id - Room ID to update
 * @returns React Query mutation for updating room status
 */
export const updateRoomStatus = (
  id: string | number,
): UseMutationResult<
  AxiosResponse<RoomResponse>,
  unknown,
  UpdateRoomStatusRequest,
  unknown
> => {
  return Mutation<RoomResponse, UpdateRoomStatusRequest>({
    url: ROOM.UPDATE_STATUS.replace(':id', String(id)),
    key: 'update-room-status',
    method: 'patch',
  });
};

/**
 * Update housekeeping status
 * @param id - Room ID to update
 * @returns React Query mutation for updating housekeeping status
 */
export const updateHousekeepingStatus = (
  id: string | number,
): UseMutationResult<
  AxiosResponse<RoomResponse>,
  unknown,
  UpdateHousekeepingStatusRequest,
  unknown
> => {
  return Mutation<RoomResponse, UpdateHousekeepingStatusRequest>({
    url: ROOM.UPDATE_HOUSEKEEPING.replace(':id', String(id)),
    key: 'update-housekeeping-status',
    method: 'patch',
  });
};

/**
 * Delete a room
 * @param id - Room ID to delete
 * @returns React Query mutation for deleting a room
 */
export const deleteRoom = (
  id: string | number,
): UseMutationResult<
  AxiosResponse<RoomResponse>,
  unknown,
  void,
  unknown
> => {
  return Mutation<RoomResponse, void>({
    url: `${ROOM.BASE}/${id}`,
    key: 'delete-room',
    method: 'delete',
  });
};
