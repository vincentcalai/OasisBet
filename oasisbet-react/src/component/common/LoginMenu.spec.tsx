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
    sessionStorage.setItem('ACCOUNT_DETAILS', '{"accId":1000022,"usrId":26,"balance":150.55,"depositLimit":1000,"depositAmt":null,"withdrawalAmt":null,"actionType":null,"ytdDepositAmt":5000,"ytdWithdrawalAmt":2000,"betLimit":200,"mtdDepositAmt":null,"mtdBetAmount":null,"mthPayout":null}');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with initial values', () => {
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
