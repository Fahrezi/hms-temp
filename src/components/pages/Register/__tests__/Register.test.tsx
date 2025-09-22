import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Register from '@/components/pages/Register';

const queryClient = new QueryClient();

describe('Register page', () => {
  it('renders the Register component correctly', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Register />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('disables the button when submitting', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Register />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Registering...' })).toBeInTheDocument();
  });

  it('matches the Register component snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Register />
        </QueryClientProvider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
