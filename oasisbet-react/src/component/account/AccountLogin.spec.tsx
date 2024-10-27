import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { screen, render, act, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import { fetchAccountDetails, jwtAuthenticate } from '../../services/api/ApiService';
import AccountLogin from './AccountLogin';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';

const mockStore = configureMockStore();
const store = mockStore({
  login: {
    isUserLoggedIn: false
  },
  error: {
    showError: false,
    errorText: ""
  }
});

jest.mock('../../services/api/ApiService.ts', () => ({
  jwtAuthenticate: jest.fn(),
  fetchAccountDetails: jest.fn()
}));

const mockJwtTokenResponse = {
  token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTcyNTA1NjkxMSwiaWF0IjoxNzI1MDU2MDExfQ.iGbRbL-PFQnzYNSLrmy8p67NjQrPXpOTkFeF41FyPB8QYxRjzqASmsR9cTrm2C7m30_tc3FFIYFIkAK-FgFsyg"
};

const mockAccountDetailsResponse = {
  account: {
    "accId":1000022,"usrId":26,"balance":0,"depositLimit":1000,"depositAmt":null,"withdrawalAmt":null,"actionType":null,"ytdDepositAmt":5000,"ytdWithdrawalAmt":2000,"betLimit":200,"mtdDepositAmt":null,"mtdBetAmount":null,"mthPayout":null
  }, 
  personalInfo: {
    "email":"TEST2@TEST.COM","contactNo":"98252798"
  }
}

const navigate = jest.fn();

describe('AccountLogin Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    sessionStorage.setItem('ACCOUNT_DETAILS', '{"accId":1000022,"usrId":26,"balance":0,"depositLimit":1000,"depositAmt":null,"withdrawalAmt":null,"actionType":null,"ytdDepositAmt":5000,"ytdWithdrawalAmt":2000,"betLimit":200,"mtdDepositAmt":null,"mtdBetAmount":null,"mthPayout":null}');
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should render AccountLogin elements when user is not logged in', async () => {
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AccountLogin />
          </MemoryRouter>
        </Provider>
      );
    });

    const heading = screen.getByRole('heading', { name: /Login/i });
    expect(heading).toBeDefined();
    const username = screen.getByLabelText(/Username:/i);
    expect(username).toBeDefined();
    const password = screen.getByLabelText(/Password:/i);
    expect(password).toBeDefined();
    const loginBtn = screen.getByRole('button', { name: /Login/i });
    expect(loginBtn).toBeDefined();
    const signupBtn = screen.getByRole('button', { name: /Sign Up Here/i });
    expect(signupBtn).toBeDefined();
  });

  it('should show invalid credential error message when user login fails', async () => {
    (jwtAuthenticate as jest.Mock).mockResolvedValue(null);
    const user = userEvent.setup();

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AccountLogin />
          </MemoryRouter>
        </Provider>
      );
    });

    const username = screen.getByLabelText(/Username:/i);
    const password = screen.getByLabelText(/Password:/i);
    const loginBtn = screen.getByRole('button', { name: /Login/i });
    await user.type(username, 'TESTUSER');
    await user.type(password, 'password');
    await user.click(loginBtn);

    await waitFor(() => {
      const error = screen.getByText(/Please enter a valid credential\. Login failed\./i);
      expect(error).toBeDefined();
    })
  });

  it('should not show invalid credential error when login is successful', async () => {
    (jwtAuthenticate as jest.Mock).mockResolvedValue(mockJwtTokenResponse);
    (fetchAccountDetails as jest.Mock).mockResolvedValue(mockAccountDetailsResponse);
    const user = userEvent.setup();

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AccountLogin />
          </MemoryRouter>
        </Provider>
      );
    });

    const username = screen.getByLabelText(/Username:/i);
    const password = screen.getByLabelText(/Password:/i);
    const loginBtn = screen.getByRole('button', { name: /Login/i });
    await user.type(username, 'TESTUSER');
    await user.type(password, 'password');
    await user.click(loginBtn);

    await waitFor(() => {
      const error = screen.queryByText(/Please enter a valid credential\. Login failed\./i);
      expect(error).toBeNull();
    })
  });

  it('should not show invalid credential error when login is successful', async () => {
    const mockError = {
      response: {
        status: 401,
        data: { message: 'Invalid Credentials' },
      },
    };
    (jwtAuthenticate as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    const user = userEvent.setup();

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AccountLogin />
          </MemoryRouter>
        </Provider>
      );
    });

    const username = screen.getByLabelText(/Username:/i);
    const password = screen.getByLabelText(/Password:/i);
    const loginBtn = screen.getByRole('button', { name: /Login/i });
    await user.type(username, 'TESTUSER');
    await user.type(password, 'password');
    await user.click(loginBtn);

    await waitFor(() => {
      const error = screen.getByText(/Please enter a valid credential\. Login failed\./i);
      expect(error).toBeDefined();
    })
  });

  it('should navigate to create user screen when user clicks Sign Up', async () => {
    const user = userEvent.setup();

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AccountLogin />
          </MemoryRouter>
        </Provider>
      );
    });

    const signUpBtn = screen.getByRole('button', { name: /Sign Up Here/i });
    await user.click(signUpBtn);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/create-user');
    })
  });

});