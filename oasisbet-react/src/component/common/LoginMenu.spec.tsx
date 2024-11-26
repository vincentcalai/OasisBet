import { render, screen, act } from '@testing-library/react';
import LoginMenu from './LoginMenu'; // Adjust path if needed
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../util/useSessionStorage.ts', () => ({
  getSessionStorageOrDefault: jest.fn(),
}));

describe('LoginMenu Component', () => {
  let dispatchMock: jest.Mock;
  let navigateMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    navigateMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with initial values', () => {
    (useSelector as unknown as jest.Mock).mockReturnValueOnce({
      accountDetails: { balance: 150.55 }
    });

    (useSelector as unknown as jest.Mock).mockReturnValueOnce({
      login: { isUserLoggedIn: true, balance: 150.55 }
    });

    render(<LoginMenu />);

    const loginText = screen.getByText(/LOGGED IN/i);
    const balance = screen.getByText(/Balance:/i);
    const button = screen.getByRole('button', { name: /Logout/i });
    expect(loginText).toBeDefined();
    expect(balance).toBeDefined();
    expect(button).toBeDefined();
  });

});
