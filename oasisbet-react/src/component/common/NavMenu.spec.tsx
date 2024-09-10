import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavMenu from './NavMenu';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>), // Mock Link to behave like an anchor
}));

describe('NavMenu Component', () => {

  const mockUseLocation = useLocation as jest.Mock;

  beforeEach(() => {
    mockUseLocation.mockReturnValue({ pathname: '/odds' });
  });

  it('should render all navigation buttons', () => {
    render(
      <MemoryRouter>
        <NavMenu />
      </MemoryRouter>
    );

    expect(screen.getByText('Odds')).toBeDefined();
    expect(screen.getByText('Result')).toBeDefined();
    expect(screen.getByText('Account')).toBeDefined();
  });

  it('should highlight the correct menu button based on the current route', async () => {
    const user = userEvent.setup();
    mockUseLocation.mockReturnValue({ pathname: '/odds' });

    render(
      <MemoryRouter>
        <NavMenu />
      </MemoryRouter>
    );

    const resultButton = screen.getByText('Odds');
    await user.click(resultButton);

    expect(screen.getByText('Odds')).toHaveClass('active');
    expect(screen.getByText('Result')).not.toHaveClass('active');
    expect(screen.getByText('Account')).not.toHaveClass('active');
  });

  it('should change active menu button when clicked', async () => {
    const user = userEvent.setup();

    mockUseLocation.mockReturnValue({ pathname: '/odds' });

    render(
      <MemoryRouter>
        <NavMenu />
      </MemoryRouter>
    );

    const resultButton = screen.getByText('Result');
    await user.click(resultButton);

    expect(resultButton).toHaveClass('active');
    expect(screen.getByText('Odds')).not.toHaveClass('active');
  });

  it('should route to correct page when link is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <NavMenu />
      </MemoryRouter>
    );

    const accountButton = screen.getByText('Account');
    await user.click(accountButton);

    expect(accountButton).toHaveClass('active');
  });
});
