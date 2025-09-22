import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NotFound from '@/components/pages/NotFound';

describe('NotFound Component', () => {
  it('renders the 404 page correctly', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Return to Dashobard')).toBeInTheDocument();
  });

  it('renders the 404 digits correctly', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const digits = screen.getAllByText(/[404]/);
    expect(digits).toHaveLength(3);
  });

  it('renders the snapshot NotFound component', () => {
    const { container } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
