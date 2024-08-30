import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { screen, render, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AccountLanding from './AccountLanding';
import userEvent from '@testing-library/user-event';
import { retrieveMtdAmounts, retrieveYtdAmounts, updateAccDetails } from '../../services/api/ApiService';
import Deposits from './Deposits';
import AccountUpdate from './AccountUpdate';

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
  // retrieveYtdAmounts: jest.fn(),
  // retrieveMtdAmounts: jest.fn(),
  // updateAccDetails: jest.fn()
}));

const mockHandleNavToTrxHist = jest.fn();

const mockResponse = {
  account: {
    mtdDepositAmt: 1000,
    ytdDepositAmt: 5000,
    ytdWithdrawalAmt: 2000,
  },
};

const mockUpdateAccountDetailSuccessResponse = {
  account: {
    mtdDepositAmt: 1000,
    ytdDepositAmt: 5000,
    ytdWithdrawalAmt: 2000,
  },
  statusCode: 0,
  resultMessage: 'Deposit was successful.'
};

const mockUpdateAccountDetailFailureResponse = {
  account: {
    mtdDepositAmt: 1000,
    ytdDepositAmt: 5000,
    ytdWithdrawalAmt: 2000,
  },
  statusCode: 2,
  resultMessage: 'You have reached deposit limit for this month. Please make your deposit from next month onwards'
};

describe('AccountUpdate Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.setItem('ACCOUNT_DETAILS', '{"accId":1000022,"usrId":26,"balance":0,"depositLimit":1000,"depositAmt":null,"withdrawalAmt":null,"actionType":null,"ytdDepositAmt":5000,"ytdWithdrawalAmt":2000,"betLimit":200,"mtdDepositAmt":null,"mtdBetAmount":null,"mthPayout":null}');
    sessionStorage.setItem('PERSONAL_DETAILS', '{"email":"TEST2@TEST.COM","contactNo":"98252798"}');
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should render AccountUpdate elements Contact Info Tab when user is logged in', async () => {
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AccountUpdate/>
          </MemoryRouter>
        </Provider>
      );
    });

    const heading = screen.getByRole('heading', { name: /Account Update/i });
    expect(heading).toBeDefined();
    const accountNo = screen.getByLabelText(/Account Number/i);
    expect(accountNo).toBeDefined();
    const email = screen.getByLabelText(/Email/i);
    expect(email).toBeDefined();
    const contactNo = screen.getByLabelText(/Contact No/i);
    expect(contactNo).toBeDefined();
  });

  it('should render AccountUpdate elements Login Tab when user is logged in', async () => {
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AccountUpdate/>
          </MemoryRouter>
        </Provider>
      );
    });

    const heading = screen.getByRole('heading', { name: /Account Update/i });
    expect(heading).toBeDefined();
    const currentPassword = screen.getByLabelText(/Current Password/i);
    expect(currentPassword).toBeDefined();
    const newPassword = screen.getByLabelText(/New Password/i);
    expect(newPassword).toBeDefined();
    const cfmPassword = screen.getByLabelText(/Confirm Password/i);
    expect(cfmPassword).toBeDefined();
  });

 

});