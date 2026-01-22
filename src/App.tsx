import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import Loading from './components/ui/Loading';
import { AuthProvider } from './contexts/AuthContext';
import { DataDemoProvider } from './contexts/DataDemoContext';
import { HeaderNavProvider } from './contexts/HeaderNavContext';
import { OverlayProvider } from './contexts/OverlayContext';
import useSmallContainer from './hooks/useSmallContainer.hooks';
import { queryClient } from './lib/queryClients';
import { router } from './lib/router';

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
