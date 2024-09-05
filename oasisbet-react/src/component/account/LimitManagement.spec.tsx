import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { screen, render, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AccountLanding from './AccountLanding';
import userEvent from '@testing-library/user-event';
import { jwtAuthenticate, updateAccDetails } from '../../services/api/ApiService';
import Withdrawals from './Withdrawals';
import LimitManagement from './LimitManagement';

const mockReducer = {
  login: {
    isUserLoggedIn: true
  },
  error: {
    showError: false,
    errorText: ""
  }
};

const mockStore = configureMockStore();
const store = mockStore(mockReducer);

jest.mock('../../services/api/ApiService.ts', () => ({
  updateAccDetails: jest.fn(),
  jwtAuthenticate: jest.fn()
}));

const mockHandleNavToTrxHist = jest.fn();

const mockJwtTokenResponse = {
  token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTcyNTA1NjkxMSwiaWF0IjoxNzI1MDU2MDExfQ.iGbRbL-PFQnzYNSLrmy8p67NjQrPXpOTkFeF41FyPB8QYxRjzqASmsR9cTrm2C7m30_tc3FFIYFIkAK-FgFsyg"
};

const mockWithdrawSuccessResponse = {
  account: {
    balance: 227.13,
  },
  statusCode: 0,
  resultMessage: 'Withdrawal was successful.'
};

const mockWithdrawFailureResponse = {
  statusCode: 3,
  resultMessage: 'The withdrawal amount is more than the current account balance'
};

describe('LimitManagement Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.setItem('ACCOUNT_DETAILS', '{"accId":1000022,"usrId":26,"balance":0,"depositLimit":1000,"depositAmt":null,"withdrawalAmt":null,"actionType":null,"ytdDepositAmt":5000,"ytdWithdrawalAmt":2000,"betLimit":200,"mtdDepositAmt":null,"mtdBetAmount":null,"mthPayout":null}');
    sessionStorage.setItem('AUTH_USER', 'CHOONANN');

  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should render LimitManagement elements when user is logged in', async () => {
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement />
          </MemoryRouter>
        </Provider>
      );
    });

    const heading = screen.getByRole('heading', { name: /Limit Management/i });
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const mthlyDepositLimitInput = screen.getByLabelText(/Monthly Deposit Limit Input/i);
    const mthlyBetLimitInput = screen.getByLabelText(/Monthly Betting Limit Input/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    expect(heading).toBeDefined();
    expect(cancelButton).toBeDefined();
    expect(confirmButton).toBeDefined();
    expect(mthlyDepositLimitDropdown).toBeDefined();
    expect(mthlyBetLimitDropdown).toBeDefined();
    expect(mthlyDepositLimitInput).toBeDefined();
    expect(mthlyBetLimitInput).toBeDefined();
    expect(password).toBeDefined();
  });

  it('should render LimitManagement as Header when user selected side nav menu', async () => {
    const user = userEvent.setup();

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AccountLanding />
          </MemoryRouter>
        </Provider>
      ); 
    });

    await user.click(screen.getByText(/Limit Management/i)); 
    const limitMgntHeader = screen.getByRole('heading', { name: /Limit Management/i });
    expect(limitMgntHeader).toBeDefined();
  });

  it('should render LimitManagement elements when user is not logged in', async () => {
    await act(async () => { 
      render(
        <Provider store={
            mockStore({
              ...mockReducer, 
              login: {
                isUserLoggedIn: false
              }
            })
          }>
          <MemoryRouter>
            <AccountLanding />
          </MemoryRouter>
        </Provider>
      );
    });

    const loginHeading = screen.getByRole('heading', { name: /Login/i });
    expect(loginHeading).toBeDefined();
    const limitMgntHeader = screen.queryByRole('heading', { name: /Limit Management/i });
    expect(limitMgntHeader).toBeNull();
  });

});