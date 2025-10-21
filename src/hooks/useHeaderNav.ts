import { useContext } from 'react';

import HeaderNavContext from '@/contexts/HeaderNavContext';


export const useHeaderNav = () => {
  const context = useContext(HeaderNavContext);
  if (context === undefined) {
    throw new Error('useHeaderNav must be used within an HeaderNav');
  }
  return context;
};
