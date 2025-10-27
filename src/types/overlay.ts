export type OverlayState = {
  isActive: boolean;
}

export type OverlayAction = {
  type: 'ACTIVATE_OVERLAY';
  payload?: Partial<OverlayState>;
};

export type OverlayContextType = OverlayState & {
  activateOverlay: (status: boolean) => void;
};