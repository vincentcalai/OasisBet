import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { screen, render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AccountLanding from './AccountLanding';
import { retrieveYtdAmounts } from '../../services/api/ApiService';

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
    sessionStorage.setItem('ACCOUNT_DETAILS', '{"accId":1000022,"usrId":26,"balance":0,"depositLimit":1000,"depositAmt":null,"withdrawalAmt":null,"actionType":null,"ytdDepositAmt":5000,"ytdWithdrawalAmt":2000,"betLimit":200,"mtdDepositAmt":null,"mtdBetAmount":null,"mthPayout":null}');
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
    (retrieveYtdAmounts as jest.Mock).mockReturnValue(mockResponse);

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

  it('should render default 0 values when call retrieve YTD amounts api fails', async () => {
    const mockError = new Error('Token expired');
    (retrieveYtdAmounts as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AccountLanding />
          </MemoryRouter>
        </Provider>
      );
    });

    const balance = screen.getByLabelText('Account Balance');
    expect(balance).toHaveTextContent('$0.00');
    const ytdDepositAmt = screen.getByLabelText('YTD Deposit Amount');
    expect(ytdDepositAmt).toHaveTextContent('$0.00');
    const ytdWithdrawalAmt = screen.getByLabelText('YTD Withdrawal Amount');
    expect(ytdWithdrawalAmt).toHaveTextContent('$0.00');
  });

});