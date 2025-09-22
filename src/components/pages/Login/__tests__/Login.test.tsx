import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import Login from '@/components/pages/Login';

import { AuthProvider } from '@/contexts/AuthContext';

vi.mock('@/services/auth.service', () => ({
  loginRequest: () => ({
    mutateAsync: vi.fn().mockResolvedValue({
      data: {
        user: { id: 1, email: 'test@example.com', accessToken: 'fake-token' },
      },
    }),
  }),
}));

describe('Login Component', () => {
  it('renders the login component', () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('handles login submission', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Logging in.../i)).toBeInTheDocument();
    });
  });
});
