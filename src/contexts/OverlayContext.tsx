import { OverlayAction, OverlayContextType, OverlayState } from '@/types/overlay';
import { Close, Content, Dialog, Overlay, Portal } from '@radix-ui/react-dialog';
import { createContext, type ReactNode, useCallback, useEffect, useReducer } from 'react';

const initialState: OverlayState = {
  isActive: false,
};

const authReducer = (state: OverlayState, action: OverlayAction): OverlayState => {
  switch (action.type) {
    case 'ACTIVATE_OVERLAY':
      return { ...state, ...action.payload, isActive: action.payload?.isActive || false };
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

  return (
    <OverlayContext.Provider value={{ ...state, activateOverlay }}>
      {children}
      {state.isActive && <div className="bg-black/40 w-screen h-screen fixed inset-0 top-0 left-0 z-40"></div>}
    </OverlayContext.Provider>
  );
};

export default OverlayContext;
