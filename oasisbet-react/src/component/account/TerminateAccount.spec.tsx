import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { screen, render, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import TerminateAccount from './TerminateAccount';
import userEvent from '@testing-library/user-event';
import AccountLanding from './AccountLanding';
import { jwtAuthenticate, terminateAccount } from '../../services/api/ApiService';

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
  jwtAuthenticate: jest.fn(),
  terminateAccount: jest.fn()
}));

const mockJwtTokenResponse = {
  token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTcyNTA1NjkxMSwiaWF0IjoxNzI1MDU2MDExfQ.iGbRbL-PFQnzYNSLrmy8p67NjQrPXpOTkFeF41FyPB8QYxRjzqASmsR9cTrm2C7m30_tc3FFIYFIkAK-FgFsyg"
};

const mockTerminateAccSuccessResponse = {
  account: {
    balance: 227.13,
  },
  statusCode: 0,
  resultMessage: 'Account has been terminated successfully.'
};

const mockTerminateAccFailureResponse = {
  statusCode: 1,
  resultMessage: 'There are still funds in your account. Please make sure that you have withdrawn all funds from your Account'
};

describe('TerminateAccount Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should render Terminate Account elements when user is logged in', async () => {
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TerminateAccount/>
          </MemoryRouter>
        </Provider>
      );
    });

    const heading = screen.getByRole('heading', { name: /Terminate Account/i });
    const checkbox = screen.getByRole('checkbox', { name: /I have read and understood the above and would like to proceed with my Account closure request/i });
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    expect(heading).toBeDefined();
    expect(checkbox).toBeDefined();
    expect(confirmButton).toBeDefined();
  });

  it('should render Terminate Account as Header when user selected side nav menu', async () => {
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

    await user.click(screen.getByText(/Terminate Account/i)); 
    const terminateAccHeader = screen.getByRole('heading', { name: /Terminate Account/i });
    expect(terminateAccHeader).toBeDefined();
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
    const withdrawalHeader = screen.queryByRole('heading', { name: /Terminate Account/i });
    expect(withdrawalHeader).toBeNull();
  });

  it('should show Confirm Terminate Account dialog when user clicks confirm', async () => {
    const user = userEvent.setup();
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TerminateAccount />
          </MemoryRouter>
        </Provider>
      );
    });

    const checkbox = screen.getByRole('checkbox', { name: /I have read and understood the above and would like to proceed with my Account closure request/i });
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.click(checkbox);
    await user.click(confirmButton);
    const withdrawalHeader = screen.queryByRole('heading', { name: /Confirm terminate account?/i });
    expect(withdrawalHeader).toBeDefined();
  });

  it('should show terminate account success when user confirm terminate account', async () => {
    const user = userEvent.setup();
    (terminateAccount as jest.Mock).mockResolvedValue(mockTerminateAccSuccessResponse);
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TerminateAccount />
          </MemoryRouter>
        </Provider>
      );
    });

    const checkbox = screen.getByRole('checkbox', { name: /I have read and understood the above and would like to proceed with my Account closure request/i });
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.click(checkbox);
    await user.click(confirmButton);
    const confirmDialogButton = screen.getByTestId('dialog-confirm');
    await user.click(confirmDialogButton);
    await waitFor(() => {
      const successMessage = screen.getByText(/Account has been terminated successfully\./i);
      expect(successMessage).toBeDefined();
    });
  });

  it('should show funds is not zero error message when user confirm terminate account and account balance is not zero', async () => {
    const user = userEvent.setup();
    (terminateAccount as jest.Mock).mockResolvedValue(mockTerminateAccFailureResponse);
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TerminateAccount />
          </MemoryRouter>
        </Provider>
      );
    });

    const checkbox = screen.getByRole('checkbox', { name: /I have read and understood the above and would like to proceed with my Account closure request/i });
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.click(checkbox);
    await user.click(confirmButton);
    const confirmDialogButton = screen.getByTestId('dialog-confirm');
    await user.click(confirmDialogButton);
    await waitFor(() => {
      const errorMessage = screen.getByText(/There are still funds in your account\. Please make sure that you have withdrawn all funds from your Account/i);
      expect(errorMessage).toBeDefined();
    });
  });

  it('should not show successful message when token expired', async () => {
    const user = userEvent.setup();
    const mockError = new Error('Token expired');
    (jwtAuthenticate as jest.Mock).mockResolvedValue(mockJwtTokenResponse);
    (terminateAccount as jest.Mock).mockImplementation(() => {
      throw mockError;
    });
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TerminateAccount/>
          </MemoryRouter>
        </Provider>
      );
    });

    const checkbox = screen.getByRole('checkbox', { name: /I have read and understood the above and would like to proceed with my Account closure request/i });
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.click(checkbox);
    await user.click(confirmButton);
    const confirmDialogButton = screen.getByTestId('dialog-confirm');
    await user.click(confirmDialogButton);
    await waitFor(() => {
      const successMessage = screen.queryByText(/Account has been terminated successfully\./i);
      expect(successMessage).toBeNull();
    });
  });

});