import { render } from '@testing-library/react';

import LazyImage from '@/components/ui/LazyImage';

describe('LazyImage component', () => {
  it('renders the image with correct alt text', async () => {
    const { container } = render(<LazyImage src='/test.jpg' alt='Test Image' />);
    expect(container).toMatchSnapshot();
  });
});
