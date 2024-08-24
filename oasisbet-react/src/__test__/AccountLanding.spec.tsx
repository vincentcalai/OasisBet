import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { screen, render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AccountLanding from '../component/account/AccountLanding';
import userEvent from '@testing-library/user-event';
import { retrieveMtdAmounts, retrieveYtdAmounts } from '../services/api/ApiService';

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

const mockResponse = {
  account: {
    mtdDepositAmt: 1000,
    ytdDepositAmt: 5000,
    ytdWithdrawalAmt: 2000,
  },
};

describe('AccountLanding Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
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

    const heading = screen.getByRole('heading', { name: /Login/i });
    expect(heading).toBeDefined();
  });

});