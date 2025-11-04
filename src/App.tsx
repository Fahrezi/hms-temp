import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import Loading from './components/ui/Loading';
import { AuthProvider } from './contexts/AuthContext';
import useSmallContainer from './hooks/useSmallContainer';
import { queryClient } from './libs/queryClients';
import { router } from './libs/router';
import { HeaderNavProvider } from './contexts/HeaderNavContext';
import { OverlayProvider } from './contexts/OverlayContext';
import { DataDemoProvider } from './contexts/DataDemoContext';

const App = () => {
  useSmallContainer();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OverlayProvider>
          <HeaderNavProvider>
            <DataDemoProvider>
              <Suspense fallback={<Loading />}>
                <RouterProvider router={router} />
              </Suspense>
            </DataDemoProvider>
          </HeaderNavProvider>
        </OverlayProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
