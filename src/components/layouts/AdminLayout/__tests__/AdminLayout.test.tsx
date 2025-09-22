import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import AdminLayout from '@/components/layouts/AdminLayout';

import { useAuth } from '@/hooks/useAuth';

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

const mockUseAuth = useAuth as unknown as ReturnType<typeof vi.fn>;

describe('AdminLayout Component', () => {
  it('renders the layout correctly', () => {
    const mockLogout = vi.fn();
    mockUseAuth.mockReturnValue({ logout: mockLogout });

    const { container } = render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('calls logout function when logout button is clicked', () => {
    const mockLogout = vi.fn();
    mockUseAuth.mockReturnValue({ logout: mockLogout });

    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>,
    );

    const logoutButton = screen.getByRole('button', { name: /log out/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
