/* eslint-disable sonarjs/no-duplicate-string */
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import DetailUser from '@/components/pages/Detail';
import useUserDetail from '@/components/pages/Detail/useUserDetail';

vi.mock('@/components/pages/Detail/useUserDetail');

describe('DetailUser Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state when data is fetching', () => {
    vi.mocked(useUserDetail).mockReturnValue({
      isLoading: true,
      userData: undefined,
      error: null,
    });

    render(<DetailUser />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders error state when there is an error', () => {
    vi.mocked(useUserDetail).mockReturnValue({
      isLoading: false,
      error: {
        message: 'Something went wrong',
        name: '',
      },
      userData: undefined,
    });

    render(<DetailUser />);

    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });

  it('renders not found state when userData is null', () => {
    vi.mocked(useUserDetail).mockReturnValue({
      isLoading: false,
      error: null,
      userData: undefined,
    });

    render(<DetailUser />);

    expect(screen.getByText('User not found')).toBeInTheDocument();
  });

  it('renders user details when data is available', () => {
    vi.mocked(useUserDetail).mockReturnValue({
      isLoading: false,
      error: null,
      userData: {
        user_id: 1,
        email: 'user@example.com',
        display_name: '',
        roles: [],
      },
    });

    render(<DetailUser />);

    expect(screen.getByText('User Details')).toBeInTheDocument();
    expect(screen.getByText('ID:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
  });

  it('navigates back when the back button is clicked', () => {
    window.history.back = vi.fn();

    vi.mocked(useUserDetail).mockReturnValue({
      isLoading: false,
      error: null,
      userData: {
        user_id: 1,
        email: 'user@example.com',
        display_name: '',
        roles: [],
      },
    });

    render(<DetailUser />);

    const backButton = screen.getByText('< back');
    fireEvent.click(backButton);

    expect(window.history.back).toHaveBeenCalled();
  });

  it('renders the snapshot DetailUser component', () => {
    vi.mocked(useUserDetail).mockReturnValue({
      isLoading: false,
      error: null,
      userData: {
        user_id: 1,
        email: 'user@example.com',
        display_name: '',
        roles: [],
      },
    });

    const { container } = render(<DetailUser />);
    expect(container).toMatchSnapshot();
  });
});
