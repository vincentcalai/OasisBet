import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { screen, render, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AccountLanding from './AccountLanding';
import userEvent from '@testing-library/user-event';
import { retrieveMtdAmounts, retrieveTrxList, retrieveYtdAmounts, updateAccDetails } from '../../services/api/ApiService';
import TrxHist from './TrxHist';

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
  retrieveMtdAmounts: jest.fn(),
  retrieveTrxList: jest.fn()
}));

const mockResponse = {
  account: {
    mtdDepositAmt: 1000,
    ytdDepositAmt: 5000,
    ytdWithdrawalAmt: 2000,
  },
};

const mockTrxListResponse = {
  resultMessage: null,
  statusCode: 0,
  trxHistList: [
    {
        "dateTime": "2024-08-30T22:23:32.000+00:00",
        "desc": "Withdrawal $1",
        "type": "W",
        "amount": 1,
        "trxBetDetails": null
    },
    {
        "dateTime": "2024-08-30T22:13:32.000+00:00",
        "desc": "Withdrawal $1",
        "type": "W",
        "amount": 1,
        "trxBetDetails": null
    },
    {
        "dateTime": "2024-08-10T05:04:39.000+00:00",
        "desc": "Deposit $1",
        "type": "D",
        "amount": 1,
        "trxBetDetails": null
    },
    {
        "dateTime": "2024-08-09T13:52:30.000+00:00",
        "desc": "Deposit $1",
        "type": "D",
        "amount": 1,
        "trxBetDetails": null
    },
    {
        "dateTime": "2024-08-09T13:50:47.000+00:00",
        "desc": "Manchester United vs Fulham",
        "type": "S",
        "amount": 1,
        "trxBetDetails": {
            "startTime": "2024-08-16T19:00:00.000+00:00",
            "compType": "EPL",
            "betDetails": "Manchester United vs Fulham @ Manchester United 1.59",
            "betType": "01",
            "status": true,
            "trxId": "B/1000016/100194"
        }
    },
    {
        "dateTime": "2024-08-09T13:50:40.000+00:00",
        "desc": "Manchester United vs Fulham",
        "type": "S",
        "amount": 1,
        "trxBetDetails": {
            "startTime": "2024-08-16T19:00:00.000+00:00",
            "compType": "EPL",
            "betDetails": "Manchester United vs Fulham @ Manchester United 1.59",
            "betType": "01",
            "status": true,
            "trxId": "B/1000016/100193"
        }
    },
    {
        "dateTime": "2024-08-09T04:38:35.000+00:00",
        "desc": "Deposit $122",
        "type": "D",
        "amount": 122,
        "trxBetDetails": null
    },
    {
        "dateTime": "2024-08-07T13:30:07.000+00:00",
        "desc": "Manchester United vs Fulham",
        "type": "S",
        "amount": 3,
        "trxBetDetails": {
            "startTime": "2024-08-16T19:00:00.000+00:00",
            "compType": "EPL",
            "betDetails": "Manchester United vs Fulham @ Manchester United 1.59",
            "betType": "01",
            "status": true,
            "trxId": "B/1000016/100191"
        }
    },
    {
        "dateTime": "2024-08-07T12:44:15.000+00:00",
        "desc": "Manchester United vs Fulham",
        "type": "S",
        "amount": 1,
        "trxBetDetails": {
            "startTime": "2024-08-16T19:00:00.000+00:00",
            "compType": "EPL",
            "betDetails": "Manchester United vs Fulham @ Manchester United 1.59",
            "betType": "01",
            "status": true,
            "trxId": "B/1000016/100190"
        }
    },
    {
        "dateTime": "2024-08-07T12:43:44.000+00:00",
        "desc": "Manchester United vs Fulham",
        "type": "S",
        "amount": 1,
        "trxBetDetails": {
            "startTime": "2024-08-16T19:00:00.000+00:00",
            "compType": "EPL",
            "betDetails": "Manchester United vs Fulham @ Fulham 4.78",
            "betType": "01",
            "status": true,
            "trxId": "B/1000016/100189"
        }
    }
  ]
};

describe('TrxHist Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.setItem('ACCOUNT_DETAILS', '{"accId":1000022,"usrId":26,"balance":0,"depositLimit":1000,"depositAmt":null,"withdrawalAmt":null,"actionType":null,"ytdDepositAmt":5000,"ytdWithdrawalAmt":2000,"betLimit":200,"mtdDepositAmt":null,"mtdBetAmount":null,"mthPayout":null}');
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should render Transaction History elements when user is logged in', async () => {
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockResponse);
    (retrieveTrxList as jest.Mock).mockResolvedValue(mockTrxListResponse);
    
    await act(async () => { 
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TrxHist/>
          </MemoryRouter>
        </Provider>
      );
    });

    const heading = screen.getByRole('heading', { name: /Transaction History/i });
    const view = screen.getByRole('combobox', { name: /View/i });
    const timePeriod = screen.getByRole('combobox', { name: /Time Period/i });
    expect(heading).toBeDefined();
    expect(view).toBeDefined();
    expect(timePeriod).toBeDefined();
  });

  it('should render Transaction History as Header when user selected side nav menu', async () => {
    (retrieveMtdAmounts as jest.Mock).mockResolvedValue(mockResponse);
    (retrieveTrxList as jest.Mock).mockResolvedValue(mockTrxListResponse);

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

    await user.click(screen.getByText(/Transaction History/i)); 
    const depositsHeader = screen.getByRole('heading', { name: /Transaction History/i });
    expect(depositsHeader).toBeDefined();
  });

  it('should render Transaction History elements when user is not logged in', async () => {
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
    const depositHeading = screen.queryByRole('heading', { name: /Transaction History/i });
    expect(depositHeading).toBeNull();
  });

});