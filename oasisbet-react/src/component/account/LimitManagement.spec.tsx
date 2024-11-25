import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { screen, render, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AccountLanding from './AccountLanding';
import userEvent from '@testing-library/user-event';
import { jwtAuthenticate, retrieveMtdAmounts, updateAccDetails } from '../../services/api/ApiService';
import Withdrawals from './Withdrawals';
import LimitManagement from './LimitManagement';

const mockReducer = {
  accountDetails: {
    depositAmt: 100
  },
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
  retrieveMtdAmounts: jest.fn(),
  updateAccDetails: jest.fn(),
  jwtAuthenticate: jest.fn()
}));

const mockAccountResponse = {
  account: {
    mtdDepositAmt: 1000,
    ytdDepositAmt: 5000,
    ytdWithdrawalAmt: 2000,
  },
};

const mockJwtTokenResponse = {
  token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTcyNTA1NjkxMSwiaWF0IjoxNzI1MDU2MDExfQ.iGbRbL-PFQnzYNSLrmy8p67NjQrPXpOTkFeF41FyPB8QYxRjzqASmsR9cTrm2C7m30_tc3FFIYFIkAK-FgFsyg"
};

const mockSetLimitSuccessResponse = {
  account: {
    balance: 227.13,
  },
  statusCode: 0,
  resultMessage: 'Deposit/Bet Limit Change was successful.'
};

const mockSetLimitFailureResponse = {
  statusCode: 3,
  resultMessage: 'User Account/Betting Account not found. Please contact the administrator.'
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
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);

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
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);

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

  it('should render default values when call retrieve MTD amounts api fails', async () => {
    const mockError = new Error('Token expired');
    (retrieveMtdAmounts as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement />
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const mthlyDepositLimitInput = screen.getByLabelText(/Monthly Deposit Limit Input/i);
    const mthlyBetLimitInput = screen.getByLabelText(/Monthly Betting Limit Input/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    expect(mthlyDepositLimitDropdown).toHaveValue('300');
    expect(mthlyBetLimitDropdown).toHaveValue('100');
    expect(mthlyDepositLimitInput).toHaveValue('300');
    expect(mthlyBetLimitInput).toHaveValue('100');
    expect(password).toHaveValue('');
  });

  it('should render correct input textbox values when selected dropdown value is not others', async () => {
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement />
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const mthlyDepositLimitInput = screen.getByLabelText(/Monthly Deposit Limit Input/i);
    const mthlyBetLimitInput = screen.getByLabelText(/Monthly Betting Limit Input/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    await userEvent.selectOptions(mthlyDepositLimitDropdown, '500');
    await userEvent.selectOptions(mthlyBetLimitDropdown, '500');
    await userEvent.type(password, 'password');
    await waitFor(() => {
      expect(mthlyDepositLimitInput).toHaveValue('500');
      expect(mthlyBetLimitInput).toHaveValue('500');
      expect(password).toHaveValue('password');
    });
  });

  it('should render correct input textbox values when selected dropdown value is not others', async () => {
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement />
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const mthlyDepositLimitInput = screen.getByLabelText(/Monthly Deposit Limit Input/i);
    const mthlyBetLimitInput = screen.getByLabelText(/Monthly Betting Limit Input/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    await userEvent.selectOptions(mthlyDepositLimitDropdown, '500');
    await userEvent.selectOptions(mthlyBetLimitDropdown, '500');
    await userEvent.type(password, 'password');
    await waitFor(() => {
      expect(mthlyDepositLimitInput).toHaveValue('500');
      expect(mthlyBetLimitInput).toHaveValue('500');
      expect(password).toHaveValue('password');
    });
  });

  it('should render correct input textbox values when selected dropdown value is others and user input custom amount', async () => {
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement />
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const mthlyDepositLimitInput = screen.getByLabelText(/Monthly Deposit Limit Input/i);
    const mthlyBetLimitInput = screen.getByLabelText(/Monthly Betting Limit Input/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    await userEvent.selectOptions(mthlyDepositLimitDropdown, 'other');
    await userEvent.selectOptions(mthlyBetLimitDropdown, 'other');
    await userEvent.type(mthlyDepositLimitInput, '600');
    await userEvent.type(mthlyBetLimitInput, '600');
    await userEvent.type(password, 'password');
    await waitFor(() => {
      expect(mthlyDepositLimitInput).toHaveValue('600');
      expect(mthlyBetLimitInput).toHaveValue('600');
      expect(password).toHaveValue('password');
    });
  });

  it('should return all values to default when user clicks cancel', async () => {
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement />
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const mthlyDepositLimitInput = screen.getByLabelText(/Monthly Deposit Limit Input/i);
    const mthlyBetLimitInput = screen.getByLabelText(/Monthly Betting Limit Input/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });

    await userEvent.selectOptions(mthlyDepositLimitDropdown, '500');
    await userEvent.selectOptions(mthlyBetLimitDropdown, '500');
    await userEvent.type(password, 'password');
    await userEvent.click(cancelButton);
    await waitFor(() => {
      expect(mthlyDepositLimitDropdown).toHaveValue('300');
      expect(mthlyBetLimitDropdown).toHaveValue('100');
      expect(mthlyDepositLimitInput).toHaveValue('300');
      expect(mthlyBetLimitInput).toHaveValue('100');
      expect(password).toHaveValue('');
    });
  });

  it('should show maximum amount error message when amount was set to be more than $199999.99', async () => {
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement />
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyDepositLimitInput = screen.getByLabelText(/Monthly Deposit Limit Input/i);

    await userEvent.selectOptions(mthlyDepositLimitDropdown, 'other');
    await userEvent.type(mthlyDepositLimitInput, '200000');
    await waitFor(() => {
      const failureMessage = screen.getByText(/Maximum amount to set is \$199999\.99/i);
      expect(failureMessage).toBeDefined();
    });
  });

  it('should show incorrect format message when amount is invalid', async () => {
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement />
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyBettingLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const mthlyBettingLimitInput = screen.getByLabelText(/Monthly Betting Limit Input/i);

    await userEvent.selectOptions(mthlyBettingLimitDropdown, 'other');
    await userEvent.type(mthlyBettingLimitInput, '10..');
    await waitFor(() => {
      const failureMessage = screen.getByText(/Please enter correct format/i);
      expect(failureMessage).toBeDefined();
    });
  });

  it('should show Confirm Change Limit dialog when user inputs correct value', async () => {
    const user = userEvent.setup();
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement/>
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });

    await userEvent.selectOptions(mthlyDepositLimitDropdown, '500');
    await userEvent.selectOptions(mthlyBetLimitDropdown, '500');
    await userEvent.type(password, 'password');
    await userEvent.click(confirmButton);

    const changeLimitHeader = screen.queryByRole('heading', { name: /Are you sure to change Monthly Deposit and Monthly Betting limit?/i });
    expect(changeLimitHeader).toBeDefined();
  });

  it('should show change limit success when user enters valid amount and click confirm', async () => {
    const user = userEvent.setup();
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);
    (jwtAuthenticate as jest.Mock).mockResolvedValue(mockJwtTokenResponse);
    (updateAccDetails as jest.Mock).mockResolvedValue(mockSetLimitSuccessResponse);
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement/>
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });

    await userEvent.selectOptions(mthlyDepositLimitDropdown, '500');
    await userEvent.selectOptions(mthlyBetLimitDropdown, '500');
    await userEvent.type(password, 'password');
    await userEvent.click(confirmButton);

    const confirmDialogButton = screen.getByTestId('dialog-confirm')
    await user.click(confirmDialogButton);
    await waitFor(() => {
      const successMessage = screen.getByText(/Deposit\/Bet Limit Change was successful\./i);
      expect(successMessage).toBeDefined();
    });
  });

  it('should show account not found error message when user account not found', async () => {
    const user = userEvent.setup();
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);
    (jwtAuthenticate as jest.Mock).mockResolvedValue(mockJwtTokenResponse);
    (updateAccDetails as jest.Mock).mockResolvedValue(mockSetLimitFailureResponse);
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement/>
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });

    await userEvent.selectOptions(mthlyDepositLimitDropdown, '500');
    await userEvent.selectOptions(mthlyBetLimitDropdown, '500');
    await userEvent.type(password, 'password');
    await userEvent.click(confirmButton);

    const confirmDialogButton = screen.getByTestId('dialog-confirm')
    await user.click(confirmDialogButton);
    await waitFor(() => {
      const successMessage = screen.getByText(/User Account\/Betting Account not found. Please contact the administrator\./i);
      expect(successMessage).toBeDefined();
    });
  });

  it('should show incorrect password message when incorrect credentials was entered and throw Error', async () => {
    const user = userEvent.setup();
    const mockError = new Error('Invalid Credentials!');
    (jwtAuthenticate as jest.Mock).mockImplementation(() => {
      throw mockError;
    });
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement/>
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });

    await userEvent.selectOptions(mthlyDepositLimitDropdown, '500');
    await userEvent.selectOptions(mthlyBetLimitDropdown, '500');
    await userEvent.type(password, 'incorrectPassword');
    await userEvent.click(confirmButton);

    const confirmDialogButton = screen.getByTestId('dialog-confirm')
    await user.click(confirmDialogButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Incorrect Password\. Please enter correct password\./i);
      expect(errorMessage).toBeDefined();
      expect(password).toHaveValue('');
    });
  });

  it('should show incorrect password message when incorrect credentials was entered and response is null', async () => {
    const user = userEvent.setup();
    (jwtAuthenticate as jest.Mock).mockResolvedValue(null);
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement/>
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });

    await userEvent.selectOptions(mthlyDepositLimitDropdown, '500');
    await userEvent.selectOptions(mthlyBetLimitDropdown, '500');
    await userEvent.type(password, 'incorrectPassword');
    await userEvent.click(confirmButton);

    const confirmDialogButton = screen.getByTestId('dialog-confirm')
    await user.click(confirmDialogButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Incorrect Password\. Please enter correct password\./i);
      expect(errorMessage).toBeDefined();
      expect(password).toHaveValue('');
    });
  });

  it('should show not successful message when call update account details api fails', async () => {
    const user = userEvent.setup();
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockAccountResponse);
    (jwtAuthenticate as jest.Mock).mockResolvedValue(mockJwtTokenResponse);

    const mockError = new Error('Token expired');
    (updateAccDetails as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LimitManagement/>
          </MemoryRouter>
        </Provider>
      );
    });

    const mthlyDepositLimitDropdown = screen.getByLabelText(/Monthly Deposit Limit Dropdown/i);
    const mthlyBetLimitDropdown = screen.getByLabelText(/Monthly Betting Limit Dropdown/i);
    const password = screen.getByLabelText(/Enter OasisBet Account password/i);
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });

    await userEvent.selectOptions(mthlyDepositLimitDropdown, '500');
    await userEvent.selectOptions(mthlyBetLimitDropdown, '500');
    await userEvent.type(password, 'password');
    await userEvent.click(confirmButton);

    const confirmDialogButton = screen.getByTestId('dialog-confirm')
    await user.click(confirmDialogButton);

    await waitFor(() => {
      const successMessage = screen.queryByText(/Deposit\/Bet Limit Change was successful\./i);
      expect(successMessage).toBeNull();
    });
  });


});