import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react'
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import * as router from 'react-router';
import OddsBetSlip from './OddsBetSlip.tsx';
import SharedVarConstants from '../../constants/SharedVarConstants.ts';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

const store = mockStore({
  login: {
    isUserLoggedIn: true
  },
  betSlip: {
    betSlip: [
      {
        eventId: 100023,
        eventDesc: 'Manchester United vs Fulham',
        betTypeCd: SharedVarConstants.BET_TYPE_CD_H2H,
        betSelection: '03',
        betSelectionName: 'Fulham',
        odds: '6.50',
        startTime: '2024-09-14T14:00:00.000Z',
        compType: 'epl_soccer',
        betAmount: null,
        potentialPayout: 0
      }
    ],
    action: 'ADD'
  }, 
  error: {
    showError: false,
    errorText: ""
  }
});

jest.mock('../../services/api/ApiService.ts', () => ({
  fetchOdds: jest.fn()
}));

const navigate = jest.fn();

const mockHandleBetSlipUpdate = jest.fn();
const mockHandlePlaceBetStatusUpdate = jest.fn();
const mockPlaceBetStatus = 'I';

describe('OddsBetSlip Component', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  it('should render Headers, Buttons and Text elements upon initialisation', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
            <OddsBetSlip onBetSlipUpdate={mockHandleBetSlipUpdate} onPlaceBetStatusUpdate={mockHandlePlaceBetStatusUpdate} placeBetStatus={mockPlaceBetStatus} />
        </Provider>
      );
    });
    const heading = screen.getByRole('heading', { name: /Bet Slip/i });
    expect(heading).toBeDefined();
    const subHeader = screen.getByRole('heading', { name: /Singles/i });
    expect(subHeader).toBeDefined();
    const betDescriptionText = screen.getByText(/Manchester United vs Fulham/i);
    expect(betDescriptionText).toBeDefined();
    const betTypeText = screen.getByText(/1X2/i);
    expect(betTypeText).toBeDefined();
    const betDetails = screen.getByText(/Fulham @ 6.50/i);
    expect(betDetails).toBeDefined();
    const totalStakeText = screen.getByText(/Total Stake: \$0/i);
    expect(totalStakeText).toBeDefined();
    const placeBetBtn = screen.getByRole('button', { name: /Place Bet/i });
    expect(placeBetBtn).toBeDefined();
  });

  it('should show 0 potential payout amount when user input bet amount is invalid', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(
        <Provider store={store}>
            <OddsBetSlip onBetSlipUpdate={mockHandleBetSlipUpdate} onPlaceBetStatusUpdate={mockHandlePlaceBetStatusUpdate} placeBetStatus={mockPlaceBetStatus} />
        </Provider>
      );
    });

    const placeBetBtn = screen.getByRole('button', { name: /Place Bet/i });
    expect(placeBetBtn).toBeDefined();
    const betAmountInput = screen.getByLabelText(/Bet Amount/i);
    await user.type(betAmountInput, 'invalidAmount');

    await waitFor(() => {
      const potentialPayout = screen.getByText(/Potential Payout: \$0\.00/i);
      expect(potentialPayout).toBeDefined();
      const totalStakeText = screen.getByText(/Total Stake: \$0/i);
    expect(totalStakeText).toBeDefined();
    })
  });

  it('should show correct potential payout amount when user input bet amount', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(
        <Provider store={store}>
            <OddsBetSlip onBetSlipUpdate={mockHandleBetSlipUpdate} onPlaceBetStatusUpdate={mockHandlePlaceBetStatusUpdate} placeBetStatus={mockPlaceBetStatus} />
        </Provider>
      );
    });

    const placeBetBtn = screen.getByRole('button', { name: /Place Bet/i });
    expect(placeBetBtn).toBeDefined();
    const betAmountInput = screen.getByLabelText(/Bet Amount/i);
    await user.type(betAmountInput, '5');

    await waitFor(() => {
      const potentialPayout = screen.getByText(/Potential Payout: \$32\.50/i);
      expect(potentialPayout).toBeDefined();
      const totalStake = screen.getByText(/Total Stake: \$5/i);
      expect(totalStake).toBeDefined();
    })
  });

})
