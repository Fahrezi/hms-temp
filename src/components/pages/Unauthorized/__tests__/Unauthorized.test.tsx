import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Unauthorized from '@/components/pages/Unauthorized';

describe('Unauthorized page Component', () => {
  it('renders the Unauthorized component', () => {
    const { container } = render(
      <MemoryRouter>
        <Unauthorized />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
