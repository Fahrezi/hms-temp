import { useContext } from 'react';

import DataDemoContext from '@/contexts/DataDemoContext';

export const useDataDemo = () => {
  const context = useContext(DataDemoContext);
  if (context === undefined) {
    throw new Error('useDataDemo must be used within an DataDemoAuth');
  }
  return context;
};
