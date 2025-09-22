import { UserRole } from './auth';

export type User = {
  email: string;
  display_name: string;
  user_id: number;
  roles: UserRole[];
};

export type UserResponse = {
  user: User;
};

type UserData = {
  data: User[];
  total_pages: number;
};

export type UsersResponse = UserData;
