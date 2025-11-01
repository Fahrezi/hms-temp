export type OverlayState = {
  isActive: boolean;
  notifText: string;
  notifType: 'success' | 'error' | null;
}

export type OverlayAction = {
  type: 'ACTIVATE_OVERLAY' | 'ACTIVATE_NOTIF';
  payload?: Partial<OverlayState>;
};

export type OverlayContextType = OverlayState & {
  activateOverlay: (status: boolean) => void;
  activateNotif: (opt: { notifText: string, notifType: 'success' | 'error' }) => void;
};