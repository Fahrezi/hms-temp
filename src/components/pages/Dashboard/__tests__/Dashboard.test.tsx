/* eslint-disable sonarjs/no-duplicate-string */
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';

import Dashboard from '@/components/pages/Dashboard';
import useDashboard from '@/components/pages/Dashboard/useDashboard';

// Mock hooks
vi.mock('@/components/pages/Dashboard/useDashboard', () => ({
  default: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockUseDashboard = useDashboard as unknown as ReturnType<typeof vi.fn>;

describe('Dashboard Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the snapshot Dashboard component', () => {
    mockUseDashboard.mockReturnValue({
      usersData: [],
      totalPages: 0,
      isFetching: true,
    });

    const { container } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders loading state when data is fetching', () => {
    mockUseDashboard.mockReturnValue({
      usersData: [],
      totalPages: 0,
      isFetching: true,
    });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders user data and pagination when fetching is complete', () => {
    mockUseDashboard.mockReturnValue({
      usersData: [
        {
          user_id: 1,
          email: 'user1@example.com',
          display_name: '',
          roles: [],
        },
        {
          user_id: 2,
          email: 'user2@example.com',
          display_name: '',
          roles: [],
        },
      ],
      totalPages: 2,
      isFetching: false,
    });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    expect(screen.getByText('user2@example.com')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('navigates to user detail page on click', () => {
    mockUseDashboard.mockReturnValue({
      usersData: [
        {
          user_id: 1,
          email: 'user1@example.com',
          display_name: '',
          roles: [],
        },
      ],
      totalPages: 1,
      isFetching: false,
    });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    const userItem = screen.getByText('user1@example.com');
    fireEvent.click(userItem);

    expect(mockNavigate).toHaveBeenCalledWith('/detail/1');
  });
});
