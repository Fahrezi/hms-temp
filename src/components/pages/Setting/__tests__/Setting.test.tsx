import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Setting from '@/components/pages/Setting';

describe('Setting Component', () => {
  it('renders the Setting component correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <Setting />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Preferences' })).toBeInTheDocument();

    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('Dark mode')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('allows toggling the Enable notifications checkbox', () => {
    render(
      <MemoryRouter>
        <Setting />
      </MemoryRouter>,
    );

    const notificationsCheckbox = screen.getByLabelText('Enable notifications');
    expect(notificationsCheckbox).not.toBeChecked();

    fireEvent.click(notificationsCheckbox);
    expect(notificationsCheckbox).toBeChecked();

    fireEvent.click(notificationsCheckbox);
    expect(notificationsCheckbox).not.toBeChecked();
  });

  it('allows toggling the Dark mode checkbox', () => {
    render(
      <MemoryRouter>
        <Setting />
      </MemoryRouter>,
    );

    const darkModeCheckbox = screen.getByLabelText('Dark mode');
    expect(darkModeCheckbox).not.toBeChecked();

    fireEvent.click(darkModeCheckbox);
    expect(darkModeCheckbox).toBeChecked();

    fireEvent.click(darkModeCheckbox);
    expect(darkModeCheckbox).not.toBeChecked();
  });
});
