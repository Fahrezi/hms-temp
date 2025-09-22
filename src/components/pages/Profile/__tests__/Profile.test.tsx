import { render, screen } from '@testing-library/react';

import Profile from '@/components/pages/Profile';

describe('Profile Component', () => {
  it('renders the Profile component correctly', () => {
    render(<Profile />);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('matches the Profile component snapshot', () => {
    const { container } = render(<Profile />);
    expect(container).toMatchSnapshot();
  });
});
