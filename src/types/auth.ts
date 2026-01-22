export type UserRole = 'admin' | 'superadmin' | 'manager';

export type User = {
  email: string;
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  // email: string;
};

export type Topic = {
  id: string;
  title: string;
  description: string;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  notification: Topic[];
  messages: Topic[];
};

export type AuthAction = {
  type: 'LOGIN' | 'LOGOUT' | 'RESTORE';
  payload?: Partial<AuthState>;
};

export type AuthContextType = AuthState & {
  login: (user: User, token: string) => void;
  logout: () => void;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export type LoginRequest = {
  username: string;
  password: string;
};
