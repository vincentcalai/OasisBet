import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginMenu from './LoginMenu';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../services/api/ApiService.ts', () => ({
  jwtAuthenticate: jest.fn(),
  fetchAccountDetails: jest.fn(),
}));

const mockStore = configureStore([]);

describe('LoginMenu Component', () => {
  let store;
  let navigateMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    jest.clearAllMocks();
  });

  it('renders login form when user is not logged in', () => {
    store = mockStore({
      login: { isUserLoggedIn: false, balance: 0 },
      accountDetails: { balance: 0 },
    });

    render(
      <Provider store={store}>
        <LoginMenu />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  it('renders user info and logout button when user is logged in', () => {
    store = mockStore({
      login: { isUserLoggedIn: true, balance: 150.55 },
      accountDetails: { balance: 150.55 },
    });

    render(
      <Provider store={store}>
        <LoginMenu />
      </Provider>
    );

    expect(screen.getByText(/LOGGED IN/i)).toBeInTheDocument();
    expect(screen.getByText(/Balance: \$150.55/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  it('updates input fields when typing in login form', () => {
    store = mockStore({
      login: { isUserLoggedIn: false, balance: 0 },
      accountDetails: { balance: 0 },
    });

    render(
      <Provider store={store}>
        <LoginMenu />
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput).toHaveValue('TESTUSER'); // Assuming the input converts to uppercase
    expect(passwordInput).toHaveValue('password123');
  });

  it('navigates to create user page when Sign Up button is clicked', () => {
    store = mockStore({
      login: { isUserLoggedIn: false, balance: 0 },
      accountDetails: { balance: 0 },
    });

    render(
      <Provider store={store}>
        <LoginMenu />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    expect(navigateMock).toHaveBeenCalledWith('/create-user');
  });

  it('opens logout modal when Logout button is clicked', () => {
    store = mockStore({
      login: { isUserLoggedIn: true, balance: 150.55 },
      accountDetails: { balance: 150.55 },
    });

    render(
      <Provider store={store}>
        <LoginMenu />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Logout/i }));
    expect(store.getActions()).toContainEqual(expect.objectContaining({ type: 'OPEN_MODAL', payload: 'logoutModal' }));
  });
});
