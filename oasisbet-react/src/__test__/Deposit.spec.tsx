import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { screen, render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AccountLanding from '../component/account/AccountLanding';
import userEvent from '@testing-library/user-event';
import { retrieveMtdAmounts, retrieveYtdAmounts } from '../services/api/ApiService';
import Deposits from '../component/account/Deposits';

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

jest.mock('../services/api/ApiService.ts', () => ({
  retrieveYtdAmounts: jest.fn(),
  retrieveMtdAmounts: jest.fn()
}));

const mockHandleNavToTrxHist = jest.fn();

const mockResponse = {
  account: {
    mtdDepositAmt: 1000,
    ytdDepositAmt: 5000,
    ytdWithdrawalAmt: 2000,
  },
};

describe('Deposits Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.setItem('ACCOUNT_DETAILS', '{"accId":1000022,"usrId":26,"balance":0,"depositLimit":1000,"depositAmt":null,"withdrawalAmt":null,"actionType":null,"ytdDepositAmt":5000,"ytdWithdrawalAmt":2000,"betLimit":200,"mtdDepositAmt":null,"mtdBetAmount":null,"mthPayout":null}');
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should render Deposits elements when user is logged in', async () => {
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockResponse);
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Deposits handleNavToTrxHist={mockHandleNavToTrxHist}/>
          </MemoryRouter>
        </Provider>
      );
    });

    const heading = screen.getByRole('heading', { name: /Deposits/i });
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    const depositInput = screen.getByRole('textbox', { name: /Deposit/i });
    expect(heading).toBeDefined();
    expect(cancelButton).toBeDefined();
    expect(confirmButton).toBeDefined();
    expect(depositInput).toBeDefined();
  });

  it('should render Deposits as Header when user selected side nav menu', async () => {
    
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockResponse);
    (retrieveYtdAmounts as jest.Mock).mockResolvedValue(mockResponse);

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

    await user.click(screen.getByText(/Deposits/i)); 
    const depositsHeader = screen.getByRole('heading', { name: /Deposits/i });
    expect(depositsHeader).toBeDefined();
  });

  it('should render AccountLogin elements when user is not logged in', async () => {
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
    const depositHeading = screen.queryByRole('heading', { name: /Deposits/i });
    expect(depositHeading).toBeNull();
  });

  it('should render default 0 values when call retrieve MTD amounts api fails', async () => {
    const mockError = new Error('Token expired');
    (retrieveMtdAmounts as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Deposits handleNavToTrxHist={mockHandleNavToTrxHist}/>
          </MemoryRouter>
        </Provider>
      );
    });

    const balance = screen.getByLabelText('Account Balance');
    expect(balance).toHaveTextContent('$0.00');
    const depositRemLimit = screen.getByLabelText('Deposit Remaining Limit');
    expect(depositRemLimit).toHaveTextContent('$0.00');
  });

  it('should show Confirm Deposit dialog when user inputs correct value', async () => {
    const user = userEvent.setup();
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockResponse);
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Deposits handleNavToTrxHist={mockHandleNavToTrxHist}/>
          </MemoryRouter>
        </Provider>
      );
    });

    const depositInput = screen.getByRole('textbox', { name: /Deposit/i });
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.type(depositInput, '100');
    await user.click(confirmButton);
    const depositHeading = screen.queryByRole('heading', { name: /Are you sure to deposit?/i });
    expect(depositHeading).toBeDefined();
  });

  it('should not show Confirm Deposit dialog when user inputs maximum deposit amount more than $199999.99', async () => {
    const user = userEvent.setup();
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockResponse);
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Deposits handleNavToTrxHist={mockHandleNavToTrxHist}/>
          </MemoryRouter>
        </Provider>
      );
    });

    const depositInput = screen.getByRole('textbox', { name: /Deposit/i });
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.type(depositInput, '200000');
    await user.click(confirmButton);
    const depositHeading = screen.queryByRole('heading', { name: /Are you sure to deposit?/i });
    expect(depositHeading).toBeNull();
    const inputError = screen.getByText(/Maximum amount to deposit is \$199999\.99/i);
    expect(inputError).toBeDefined();
  });

  it('should not show Confirm Deposit dialog when user inputs invalid pattern deposit amount', async () => {
    const user = userEvent.setup();
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockResponse);
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Deposits handleNavToTrxHist={mockHandleNavToTrxHist}/>
          </MemoryRouter>
        </Provider>
      );
    });

    const depositInput = screen.getByRole('textbox', { name: /Deposit/i });
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.type(depositInput, '100..');
    await user.click(confirmButton);
    const depositHeading = screen.queryByRole('heading', { name: /Are you sure to deposit?/i });
    expect(depositHeading).toBeNull();
    const inputError = screen.getByText(/Please enter correct format/i);
    expect(inputError).toBeDefined();
  });

});