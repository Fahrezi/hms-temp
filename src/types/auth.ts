export type UserRole = 'admin' | 'superadmin' | 'manager';

export type User = {
  email: string;
  id: string;
  name: string;
  role: string;
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
  email: string;
  id: string;
  name: string;
  roles: string[];
};

export type LoginRequest = {
  email: string;
  password: string;
};
