import { encryptData } from '@/utils/secureAuth';
import { User } from '@/types/auth';

/**
 * Mock user data for testing login flow
 */
export const mockUser: User = {
  id: '1',
  email: 'admin@hotelhub.com',
  username: 'admin',
  first_name: 'John',
  last_name: 'Admin',
};

/**
 * Mock tokens for authentication
 */
export const mockTokens = {
  access_token: 'mock_access_token_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  refresh_token: 'mock_refresh_token_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};

/**
 * Mock auth state for encrypted storage
 */
export const mockAuthState = {
  user: mockUser,
  isAuthenticated: true,
  isLoading: false,
  token: mockTokens.access_token,
  notification: [],
  messages: [],
};

/**
 * Helper function to setup mock localStorage for login flow
 * Call this in your test setup or development mode
 */
export const setupMockAuth = () => {
  // Store auth data (used by AuthContext)
  localStorage.setItem('hotelhub_auth', JSON.stringify(mockUser));
  
  // Store tokens
  localStorage.setItem('hotelhub_token', mockTokens.access_token);
  localStorage.setItem('hotelhub_refresh_token', mockTokens.refresh_token);
  
  // Store encrypted auth state (used by axiosInstance)
  localStorage.setItem('auth', encryptData(mockAuthState));
  
  console.log('✅ Mock auth data loaded to localStorage');
};

/**
 * Helper function to clear all auth-related localStorage
 */
export const clearMockAuth = () => {
  localStorage.removeItem('hotelhub_auth');
  localStorage.removeItem('hotelhub_token');
  localStorage.removeItem('hotelhub_refresh_token');
  localStorage.removeItem('auth');
  
  console.log('🗑️ Mock auth data cleared from localStorage');
};

/**
 * Helper function to check if user is mocked as logged in
 */
export const isMockAuthActive = (): boolean => {
  return !!(
    localStorage.getItem('hotelhub_auth') && 
    localStorage.getItem('hotelhub_token')
  );
};

/**
 * Mock different user roles for testing
 */
export const mockUsers = {
  admin: {
    id: '1',
    email: 'john.doe',
    username: 'admin',
    first_name: 'John',
    last_name: 'Admin',
  },
  manager: {
    id: '2',
    email: 'manager@hotelhub.com',
    username: 'manager',
    first_name: 'Sarah',
    last_name: 'Manager',
  },
  frontDesk: {
    id: '3',
    email: 'frontdesk@hotelhub.com',
    username: 'frontdesk',
    first_name: 'Michael',
    last_name: 'Chen',
  },
  housekeeping: {
    id: '4',
    email: 'housekeeping@hotelhub.com',
    username: 'housekeeping',
    first_name: 'Emily',
    last_name: 'Rodriguez',
  },
};

/**
 * Setup mock auth with specific user role
 */
export const setupMockAuthWithRole = (role: keyof typeof mockUsers) => {
  const user = mockUsers[role];
  const authState = {
    user,
    isAuthenticated: true,
    isLoading: false,
    token: mockTokens.access_token,
    notification: [],
    messages: [],
  };
  
  localStorage.setItem('hotelhub_auth', JSON.stringify(user));
  localStorage.setItem('hotelhub_token', mockTokens.access_token);
  localStorage.setItem('hotelhub_refresh_token', mockTokens.refresh_token);
  localStorage.setItem('auth', encryptData(authState));
  
  console.log(`✅ Mock auth loaded for role: ${role}`);
};
