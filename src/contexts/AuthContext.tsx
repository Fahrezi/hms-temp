import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginRequest, logoutRequest } from '@/services/auth.service';
import { User } from '@/types/auth';
import { mockUsers, mockTokens, mockAuthState } from '@/data/mockLocalStorage';
import { encryptData } from '@/utils/secureAuth';

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

// Enable mock mode for development
const USE_MOCK_AUTH = true;

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
    // Mock login for development
    if (USE_MOCK_AUTH) {
      try {
        // Find mock user by email
        const mockUserEntry = Object.values(mockUsers).find(u => u.email === email);
        
        if (!mockUserEntry) {
          return {
            success: false,
            error: 'Invalid email or password'
          };
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const userData: User = mockUserEntry;
        const authState = {
          user: userData,
          isAuthenticated: true,
          isLoading: false,
          token: mockTokens.access_token,
          notification: [],
          messages: [],
        };

        setUser(userData);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        localStorage.setItem(TOKEN_STORAGE_KEY, mockTokens.access_token);
        localStorage.setItem('hotelhub_refresh_token', mockTokens.refresh_token);
        localStorage.setItem('auth', encryptData(authState));

        console.log('✅ Mock login successful:', userData.email);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error?.message || 'Login failed'
        };
      }
    }

    // Real API login (commented out for now)
    // try {
    //   const response = await loginMutation.mutateAsync({ username: email, password });
    //   const userData: User = {
    //     id: response.data.user.id,
    //     email: response.data.user.email,
    //     first_name: response.data.user.first_name,
    //     last_name: response.data.user.last_name,
    //     username: response.data.user.username,
    //   };
    //   setUser(userData);
    //   localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    //   localStorage.setItem(TOKEN_STORAGE_KEY, response.data.access_token);
    //   localStorage.setItem('hotelhub_refresh_token', response.data.refresh_token);
    //   return { success: true };
    // } catch (error: any) {
    //   return {
    //     success: false,
    //     error: error?.response?.data?.message || 'Invalid email or password'
    //   };
    // }
  };

  const logout = async () => {
    // Mock logout for development
    if (USE_MOCK_AUTH) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Clear all auth data
      setUser(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem('hotelhub_refresh_token');
      localStorage.removeItem('auth');
      console.log('✅ Mock logout successful');
      return;
    }

    // Real API logout (commented out for now)
    // try {
    //   await logoutMutation.mutateAsync();
    // } catch (error) {
    //   console.error('Logout API error:', error);
    // } finally {
    //   setUser(null);
    //   localStorage.removeItem(AUTH_STORAGE_KEY);
    //   localStorage.removeItem(TOKEN_STORAGE_KEY);
    //   localStorage.removeItem('hotelhub_refresh_token');
    //   localStorage.removeItem('auth');
    // }
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

