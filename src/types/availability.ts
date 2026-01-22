import type { Room, RoomType } from './hotel';

/**
 * Request to check room availability
 */
export interface CheckAvailabilityRequest {
  checkIn: string;
  checkOut: string;
  roomType?: RoomType;
  adults?: number;
  children?: number;
}

/**
 * Request to get room availability for specific date range
 */
export interface RoomAvailabilityParams {
  roomId?: string | number;
  checkIn: string;
  checkOut: string;
}

/**
 * Request to get occupancy rate
 */
export interface OccupancyRateParams {
  startDate: string;
  endDate: string;
  roomType?: RoomType;
}

/**
 * Request to get available rooms count
 */
export interface AvailableRoomsCountParams {
  date?: string;
  roomType?: RoomType;
}

/**
 * Request to block a room
 */
export interface BlockRoomRequest {
  roomId: string | number;
  startDate: string;
  endDate: string;
  reason?: string;
  blockedBy?: string;
}

/**
 * Request to unblock a room
 */
export interface UnblockRoomRequest {
  roomId: string | number;
  startDate: string;
  endDate: string;
}

/**
 * Response for check availability
 */
export interface CheckAvailabilityResponse {
  success: boolean;
  message: string;
  data: {
    available: boolean;
    availableRooms: Room[];
    totalAvailable: number;
  };
}

/**
 * Response for room availability
 */
export interface RoomAvailabilityResponse {
  success: boolean;
  message: string;
  data: {
    roomId: string | number;
    roomNumber: string;
    isAvailable: boolean;
    blockedDates: Array<{
      startDate: string;
      endDate: string;
      reason?: string;
    }>;
    reservations: Array<{
      id: string;
      checkIn: string;
      checkOut: string;
      guestName: string;
    }>;
  };
}

/**
 * Response for occupancy rate
 */
export interface OccupancyRateResponse {
  success: boolean;
  message: string;
  data: {
    occupancyRate: number;
    totalRooms: number;
    occupiedRooms: number;
    availableRooms: number;
    startDate: string;
    endDate: string;
    byRoomType?: Record<RoomType, {
      occupancyRate: number;
      totalRooms: number;
      occupiedRooms: number;
      availableRooms: number;
    }>;
  };
}

/**
 * Response for available rooms count
 */
export interface AvailableRoomsCountResponse {
  success: boolean;
  message: string;
  data: {
    date: string;
    totalAvailable: number;
    byRoomType: Record<RoomType, number>;
  };
}

/**
 * Response for block/unblock room
 */
export interface BlockRoomResponse {
  success: boolean;
  message: string;
  data: {
    roomId: string | number;
    blocked: boolean;
    startDate: string;
    endDate: string;
  };
}
