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

const storeWithMultipleBets = mockStore({
  login: {
    isUserLoggedIn: true
  },
  betSlip: {
    betSlip: mockMultipleBets(),
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

  it('should show decline and confirm buttons when user input bet amount and click place bet', async () => {
    const { rerender } = render(
      <Provider store={store}>
        <OddsBetSlip 
          onBetSlipUpdate={mockHandleBetSlipUpdate} 
          onPlaceBetStatusUpdate={mockHandlePlaceBetStatusUpdate} 
          placeBetStatus={mockPlaceBetStatus} 
        />
      </Provider>
    );

    const user = userEvent.setup();

    const betAmountInput = screen.getByLabelText(/Bet Amount/i);
    await user.type(betAmountInput, '5');
    const placeBet = screen.getByRole('button', { name: /Place Bet/i });
    await user.click(placeBet);

    rerender(
      <Provider store={store}>
        <OddsBetSlip 
          onBetSlipUpdate={mockHandleBetSlipUpdate} 
          onPlaceBetStatusUpdate={mockHandlePlaceBetStatusUpdate} 
          placeBetStatus={'C'} 
        />
      </Provider>
    );

    await waitFor(() => {
      const declineBtn = screen.getByRole('button', { name: /Decline/i });
      const cfmBtn = screen.getByRole('button', { name: /Confirm/i });
      expect(declineBtn).toBeDefined();
      expect(cfmBtn).toBeDefined();
    });
  });

  it('should remove all bet selections with 0 bet amount when when user type in bet amount and click place bet', async () => {
    const { rerender } = render(
      <Provider store={storeWithMultipleBets}>
        <OddsBetSlip 
          onBetSlipUpdate={mockHandleBetSlipUpdate} 
          onPlaceBetStatusUpdate={mockHandlePlaceBetStatusUpdate} 
          placeBetStatus={mockPlaceBetStatus} 
        />
      </Provider>
    );

    const user = userEvent.setup();

    const betAmountInput = screen.getAllByLabelText(/Bet Amount/i);
    await user.type(betAmountInput[0], '5');
    const placeBet = screen.getByRole('button', { name: /Place Bet/i });
    await user.click(placeBet);

    rerender(
      <Provider store={storeWithMultipleBets}>
        <OddsBetSlip 
          onBetSlipUpdate={mockHandleBetSlipUpdate} 
          onPlaceBetStatusUpdate={mockHandlePlaceBetStatusUpdate} 
          placeBetStatus={'C'} 
        />
      </Provider>
    );

    await waitFor(() => {
      const declineBtn = screen.getByRole('button', { name: /Decline/i });
      const cfmBtn = screen.getByRole('button', { name: /Confirm/i });
      expect(declineBtn).toBeDefined();
      expect(cfmBtn).toBeDefined();
    });
  });

  it('should show place bet button when user clicks decline at confirm place bet stage', async () => {
    const { rerender } = render(
      <Provider store={store}>
        <OddsBetSlip 
          onBetSlipUpdate={mockHandleBetSlipUpdate} 
          onPlaceBetStatusUpdate={mockHandlePlaceBetStatusUpdate} 
          placeBetStatus={mockPlaceBetStatus} 
        />
      </Provider>
    );

    const user = userEvent.setup();

    const betAmountInput = screen.getAllByLabelText(/Bet Amount/i);
    await user.type(betAmountInput[0], '5');
    const placeBet = screen.getByRole('button', { name: /Place Bet/i });
    await user.click(placeBet);

    rerender(
      <Provider store={storeWithMultipleBets}>
        <OddsBetSlip 
          onBetSlipUpdate={mockHandleBetSlipUpdate} 
          onPlaceBetStatusUpdate={mockHandlePlaceBetStatusUpdate} 
          placeBetStatus={'C'} 
        />
      </Provider>
    );

    const declineBtn = screen.getByRole('button', { name: /Decline/i });
    await user.click(declineBtn);

    rerender(
      <Provider store={storeWithMultipleBets}>
        <OddsBetSlip 
          onBetSlipUpdate={mockHandleBetSlipUpdate} 
          onPlaceBetStatusUpdate={mockHandlePlaceBetStatusUpdate} 
          placeBetStatus={'I'} 
        />
      </Provider>
    );

    const placeBet2 = screen.getByRole('button', { name: /Place Bet/i });
    expect(placeBet2).toBeDefined();
  });

  it('should remove bet selection when when user delete bet selection from bet slip', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(
        <Provider store={storeWithMultipleBets}>
            <OddsBetSlip onBetSlipUpdate={mockHandleBetSlipUpdate} onPlaceBetStatusUpdate={mockHandlePlaceBetStatusUpdate} placeBetStatus={mockPlaceBetStatus} />
        </Provider>
      );
    });
    const deleteIcon = screen.getAllByLabelText(/Delete Icon/i);
    await user.click(deleteIcon[0]);

    const betDescriptionText = screen.getByText(/Crystal Palace vs Ipswich Town/i);
    expect(betDescriptionText).toBeDefined();
    const betDescriptionText2 = screen.getByText(/Chelsea vs Manchester City/i);
    expect(betDescriptionText2).toBeDefined();

    const placeBetBtn = screen.getByRole('button', { name: /Place Bet/i });
    expect(placeBetBtn).toBeDefined();
  });

})

function mockMultipleBets() {
  return [
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
    }, 
    {
      eventId: 100024,
      eventDesc: 'Crystal Palace vs Ipswich Town',
      betTypeCd: SharedVarConstants.BET_TYPE_CD_H2H,
      betSelection: '01',
      betSelectionName: 'Crystal Palace',
      odds: '1.80',
      startTime: '2024-09-14T16:00:00.000Z',
      compType: 'epl_soccer',
      betAmount: null,
      potentialPayout: 0
    }, 
    {
      eventId: 100025,
      eventDesc: 'Chelsea vs Manchester City',
      betTypeCd: SharedVarConstants.BET_TYPE_CD_H2H,
      betSelection: '01',
      betSelectionName: 'Chelsea',
      odds: '3.80',
      startTime: '2024-09-14T18:00:00.000Z',
      compType: 'epl_soccer',
      betAmount: null,
      potentialPayout: 0
    }
  ];
}

