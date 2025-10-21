import { BreadcrumbType, HeaderNavAction, HeaderNavContextType, HeaderNavState } from '@/types/headerNav';
import { createContext, type ReactNode, useCallback, useReducer } from 'react';

const initialState: HeaderNavState = {
  breadcrumb: [],
  title: '',
  isLoading: true,
};

const authReducer = (state: HeaderNavState, action: HeaderNavAction): HeaderNavState => {
  switch (action.type) {
    case 'CHANGE_TITLE':
      return { ...state, ...action.payload, title: action.payload?.title || '', isLoading: false };
    case 'CHANGE_BREADCRUMB':
      return { ...state, ...action.payload, breadcrumb: action.payload?.breadcrumb || [], isLoading: false };
    default:
      return state;
  }
};

const HeaderNavContext = createContext<HeaderNavContextType | undefined>(undefined);

export const HeaderNavProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const changeTitle = useCallback((title: string) => {
    dispatch({ type: 'CHANGE_TITLE', payload: { title } });
  }, []);

  const changeBreadcrumb = useCallback((breadcrumb: BreadcrumbType[]) => {
    dispatch({ type: 'CHANGE_BREADCRUMB', payload: { breadcrumb } });
  }, []);

  return <HeaderNavContext.Provider value={{ ...state, changeTitle, changeBreadcrumb }}>{children}</HeaderNavContext.Provider>;
};

export default HeaderNavContext;
