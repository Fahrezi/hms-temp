import { createContext, type ReactNode, useCallback, useEffect, useReducer } from 'react';

import { decryptData, encryptData } from '@/utils/secureAuth';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage';
import { AuthAction, AuthContextType, AuthState, User } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload, isAuthenticated: true, isLoading: false };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    case 'RESTORE':
      return { ...state, ...action.payload, isLoading: false };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedData = getLocalStorage<string>('auth');
    if (storedData) {
      const parsedData = decryptData(storedData);
      if (parsedData) {
        dispatch({ type: 'RESTORE', payload: parsedData });
      }
    } else {
      dispatch({ type: 'RESTORE' });
    }
  }, []);

  useEffect(() => {
    if (!state.isLoading) {
      setLocalStorage('auth', encryptData(state));
    }
  }, [state]);

  const login = useCallback((user: User, token: string) => {
    dispatch({ type: 'LOGIN', payload: { user, token, isAuthenticated: true } });
  }, []);

  const logout = useCallback(() => {
    removeLocalStorage('auth');
    dispatch({ type: 'LOGOUT' });
  }, []);

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
