import { render, screen } from '@testing-library/react';

import Loading from '@/components/ui/Loading';

describe('Loading Component', () => {
  it('snapshot the loading component', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
  it('renders the loading component', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
