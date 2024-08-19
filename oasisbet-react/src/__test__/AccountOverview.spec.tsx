import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { screen, render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AccountLanding from '../component/account/AccountLanding';
import userEvent from '@testing-library/user-event';
import { retrieveMtdAmounts, retrieveYtdAmounts } from '../services/api/ApiService';

const mockStore = configureMockStore();
const store = mockStore({
  login: {
    isUserLoggedIn: true
  },
  error: {
    showError: false,
    errorText: ""
  }
});

jest.mock('../services/api/ApiService.ts', () => ({
  retrieveYtdAmounts: jest.fn(),
  retrieveMtdAmounts: jest.fn()
}));

const mockResponse = {
  account: {
    balance: 3000,
    mtdDepositAmt: 1000,
    ytdDepositAmt: 5000,
    ytdWithdrawalAmt: 2000,
  },
};

describe('AccountOverview Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.setItem('ACCOUNT_DETAILS', '{"accId":1000022,"usrId":26,"balance":0,"depositLimit":1000,"depositAmt":null,"withdrawalAmt":null,"actionType":null,"ytdDepositAmt":null,"ytdWithdrawalAmt":null,"betLimit":200,"mtdDepositAmt":null,"mtdBetAmount":null,"mthPayout":null}');
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should render AccountOverview elements when user is logged in', async () => {
    (retrieveYtdAmounts as jest.Mock).mockResolvedValue(mockResponse);

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AccountLanding />
          </MemoryRouter>
        </Provider>
      );
    });

    const heading = screen.getByRole('heading', { name: /Account Overview/i });
    expect(heading).toBeDefined();
    const balanceText = screen.getByText('Balance');
    expect(balanceText).toBeDefined();
    const depositText = screen.getByText('Deposit');
    expect(depositText).toBeDefined();
    const withdrawText = screen.getByText('Withdrawal');
    expect(withdrawText).toBeDefined();
  });

  it('should render correct balance, deposit, withdrawal value', async () => {
    (retrieveYtdAmounts as jest.Mock).mockResolvedValue(mockResponse);

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AccountLanding />
          </MemoryRouter>
        </Provider>
      );
    });

    const balance = screen.getByText('$0.00');
    expect(balance).toBeDefined();
    const ytdDepositAmt = screen.getByText('$5000.00');
    expect(ytdDepositAmt).toBeDefined();
    const ytdWithdrawalAmt = screen.getByText('$2000.00');
    expect(ytdWithdrawalAmt).toBeDefined();
  });

});