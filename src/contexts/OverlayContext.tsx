import { createContext, type ReactNode, useCallback, useEffect, useReducer } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { OverlayAction, OverlayContextType, OverlayState } from '@/types/overlay';

const initialState: OverlayState = {
  isActive: false,
  notifText: '',
  notifType: null,
};

const authReducer = (state: OverlayState, action: OverlayAction): OverlayState => {
  switch (action.type) {
    case 'ACTIVATE_OVERLAY':
      return { ...state, ...action.payload, isActive: action.payload?.isActive || false };
    case 'ACTIVATE_NOTIF':
      return { ...state, ...action.payload, notifText: action.payload?.notifText || '', notifType: action.payload?.notifType || null, };
    default:
      return state;
  }
};

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const activateOverlay = useCallback((status: boolean) => {
    dispatch({ type: 'ACTIVATE_OVERLAY', payload: { isActive: status } });
  }, []);

  const activateNotif = useCallback(({ notifText, notifType }: { notifText: string; notifType: 'success' | 'error' }) => {
    dispatch({ type: 'ACTIVATE_NOTIF', payload: { notifText, notifType } });
  }, []);


  useEffect(() => {
    if (!state.isActive) return;
    const { body, documentElement: html } = document;
    const prevOverflow = body.style.overflow;
    const prevPadRight = body.style.paddingRight;
    const scrollbar = window.innerWidth - html.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadRight;
    };
  }, [state.isActive]);

  useEffect(() => {
    if (state.notifText && state.notifType) {
      if (state.notifType === 'success') {
        toast.success(state.notifText);
      } else {
        toast.error(state.notifText);
      }
    }
  }, [state.notifText, state.notifType]);

  return (
    <OverlayContext.Provider value={{ ...state, activateOverlay, activateNotif }}>
      {children}
      {state.isActive && <div className="bg-black/40 w-screen h-screen fixed inset-0 top-0 left-0 z-40"></div>}
      <Toaster position="top-right" />
    </OverlayContext.Provider>
  );
};

export default OverlayContext;
