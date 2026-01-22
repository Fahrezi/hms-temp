import type { Room, RoomStatus, RoomType, HousekeepingStatus } from './hotel';

/**
 * Request to create a new room
 */
export interface CreateRoomRequest {
  number: string;
  type: RoomType;
  floor: number;
  price: number;
  amenities: string[];
  capacity: number;
  availableServices?: string[];
}

/**
 * Request to update a room
 */
export interface UpdateRoomRequest {
  number?: string;
  type?: RoomType;
  floor?: number;
  price?: number;
  amenities?: string[];
  capacity?: number;
  availableServices?: string[];
}

/**
 * Request to update room status
 */
export interface UpdateRoomStatusRequest {
  status: RoomStatus;
}

/**
 * Request to update housekeeping status
 */
export interface UpdateHousekeepingStatusRequest {
  housekeepingStatus: HousekeepingStatus;
}

/**
 * Query params for listing rooms by status
 */
export interface ListRoomsByStatusParams {
  status: RoomStatus;
  page?: number;
  limit?: number;
}

/**
 * Query params for listing available rooms
 */
export interface ListAvailableRoomsParams {
  checkIn?: string;
  checkOut?: string;
  roomType?: RoomType;
  page?: number;
  limit?: number;
}

/**
 * Response for a single room
 */
export interface RoomResponse {
  success: boolean;
  message: string;
  data: Room;
}

/**
 * Response for multiple rooms
 */
export interface RoomsResponse {
  success: boolean;
  message: string;
  data: Room[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
