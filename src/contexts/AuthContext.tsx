import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginRequest, logoutRequest } from '@/services/auth.service';
import { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'hotelhub_auth';
const TOKEN_STORAGE_KEY = 'hotelhub_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Call hooks at the top level of the component
  const loginMutation = loginRequest();
  const logoutMutation = logoutRequest();

  useEffect(() => {
    // Check for existing session in localStorage
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (storedAuth && storedToken) {
      try {
        const parsed = JSON.parse(storedAuth);
        setUser(parsed as User);
      } catch (e) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    console.log('login', email, password);

    try {
      // Use the mutation that was defined at the top level
      const response = await loginMutation.mutateAsync({ username: email, password });

      console.log('response', response);

      // The response is wrapped in AxiosResponse, so we need to access .data
      const userData: User = {
        id: response.data.user.id,
        email: response.data.user.email,
        first_name: response.data.user.first_name,
        last_name: response.data.user.last_name,
        username: response.data.user.username,
        // role: response.data.roles[0], // Taking the first role
      };

      setUser(userData);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      // Store the access token
      localStorage.setItem(TOKEN_STORAGE_KEY, response.data.access_token);
      // Optionally store refresh token if needed
      localStorage.setItem('hotelhub_refresh_token', response.data.refresh_token);

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error?.response?.data?.message || 'Invalid email or password'
      };
    }
  };

  const logout = async () => {
    try {
      // Use the mutation that was defined at the top level
      await logoutMutation.mutateAsync();
    } catch (error) {
      // Log error but still clear local state
      console.error('Logout API error:', error);
    } finally {
      // Always clear local state and storage
      setUser(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

