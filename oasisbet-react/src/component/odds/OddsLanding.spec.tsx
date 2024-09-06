import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react'
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import OddsLanding from './OddsLanding.tsx';
import { MemoryRouter } from 'react-router-dom';
import { fetchOdds } from '../../services/api/ApiService.ts';
import * as router from 'react-router';

const mockStore = configureMockStore();
const store = mockStore({
  login: {
    isUserLoggedIn: false
  },
  betSlip: {
    betSlip: []
  }, 
  error: {
    showError: false,
    errorText: ""
  }
});

const mockFetchOddsResponse = {
  betEvent: getMockBetEvents()
}

jest.mock('../../services/api/ApiService.ts', () => ({
  fetchOdds: jest.fn()
}));

const navigate = jest.fn();

describe('OddsLanding Component', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  it('should render English Premier League as default Comp Type Header', async () => {
    (fetchOdds as jest.Mock).mockResolvedValue(mockFetchOddsResponse);
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <OddsLanding />
          </MemoryRouter>
        </Provider>
      );
    });
    const heading = screen.getByRole('heading', { name: /English Premier League/i });
    expect(heading).toBeDefined();
  });
  
  it('should render correct header when user selects comp type', async () => {
    (fetchOdds as jest.Mock).mockResolvedValue(mockFetchOddsResponse);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OddsLanding />
        </MemoryRouter>
      </Provider>
    );
    await user.click(screen.getByText(/La Liga/i)); 
    const laLigaRole = screen.getByRole('heading', { name: /La Liga/i });
    expect(laLigaRole).toBeDefined();
    await user.click(screen.getByText(/Bundesliga/i)); 
    const bundesligaRole = screen.getByRole('heading', { name: /Bundesliga/i });
    expect(bundesligaRole).toBeDefined();
    await user.click(screen.getByText(/Serie A/i)); 
    const seriaARole = screen.getByRole('heading', { name: /Serie A/i });
    expect(seriaARole).toBeDefined();
    await user.click(screen.getByText(/Ligue One/i)); 
    const ligueOneRole = screen.getByRole('heading', { name: /Ligue One/i });
    expect(ligueOneRole).toBeDefined();
    await user.click(screen.getByText(/FA Cup/i)); 
    const faCupRole = screen.getByRole('heading', { name: /FA Cup/i });
    expect(faCupRole).toBeDefined();
    await user.click(screen.getByText(/EFL Cup/i)); 
    const eflCupRole = screen.getByRole('heading', { name: /EFL Cup/i });
    expect(eflCupRole).toBeDefined();
    await user.click(screen.getByText(/UEFA Champions League/i)); 
    const uefaChampsLeagueRole = screen.getByRole('heading', { name: /UEFA Champions League/i });
    expect(uefaChampsLeagueRole).toBeDefined();
    await user.click(screen.getByText(/English Premier League/i)); 
    const eplRole = screen.getByRole('heading', { name: /English Premier League/i });
    expect(eplRole).toBeDefined();
  });

  it('should render No Event Found text if api returns no events', async () => {
    (fetchOdds as jest.Mock).mockResolvedValue([]);

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <OddsLanding />
          </MemoryRouter>
        </Provider>
      );
    });
    const element = screen.getByText('No Event(s) Found.');
    expect(element).toBeDefined();
  });

  it('should navigate to account page if user is not logged in and user makes a bet selection', async () => {
    (fetchOdds as jest.Mock).mockResolvedValue(mockFetchOddsResponse);

    const user = userEvent.setup();

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <OddsLanding />
          </MemoryRouter>
        </Provider>
      );
    });
    const allHomeSelectionButton = screen.getAllByRole ("button", { name: /Home Select/i });
    await user.click(allHomeSelectionButton[0]);
    const allDrawSelectionButton = screen.getAllByRole ("button", { name: /Draw Select/i });
    await user.click(allDrawSelectionButton[0]);
    const allAwaySelectionButton = screen.getAllByRole ("button", { name: /Away Select/i });
    await user.click(allAwaySelectionButton[0]);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/account', expect.anything());
    })
  });

  
})

function getMockBetEvents() {
  return [
    {
        "eventId": 1000231,
        "compType": "EPL",
        "eventDesc": "Southampton vs Manchester United",
        "startTime": "2024-09-14T11:30:00.000Z",
        "teamsDetails": {
            "homeTeam": "Southampton",
            "awayTeam": "Manchester United"
        },
        "h2hEventOdds": {
            "eventId": 1000231,
            "homeOdds": 4.17,
            "drawOdds": 3.97,
            "awayOdds": 1.78
        },
        "betSelection": {
            "homeSelected": false,
            "drawSelected": false,
            "awaySelected": false
        }
    },
    {
        "eventId": 1000232,
        "compType": "EPL",
        "eventDesc": "Manchester City vs Brentford",
        "startTime": "2024-09-14T14:00:00.000Z",
        "teamsDetails": {
            "homeTeam": "Manchester City",
            "awayTeam": "Brentford"
        },
        "h2hEventOdds": {
            "eventId": 1000232,
            "homeOdds": 1.17,
            "drawOdds": 7.92,
            "awayOdds": 12.16
        },
        "betSelection": {
            "homeSelected": false,
            "drawSelected": false,
            "awaySelected": false
        }
    },
    {
        "eventId": 1000233,
        "compType": "EPL",
        "eventDesc": "Brighton and Hove Albion vs Ipswich Town",
        "startTime": "2024-09-14T14:00:00.000Z",
        "teamsDetails": {
            "homeTeam": "Brighton and Hove Albion",
            "awayTeam": "Ipswich Town"
        },
        "h2hEventOdds": {
            "eventId": 1000233,
            "homeOdds": 1.34,
            "drawOdds": 5.38,
            "awayOdds": 7.98
        },
        "betSelection": {
            "homeSelected": false,
            "drawSelected": false,
            "awaySelected": false
        }
    },
    {
        "eventId": 1000234,
        "compType": "EPL",
        "eventDesc": "Crystal Palace vs Leicester City",
        "startTime": "2024-09-14T14:00:00.000Z",
        "teamsDetails": {
            "homeTeam": "Crystal Palace",
            "awayTeam": "Leicester City"
        },
        "h2hEventOdds": {
            "eventId": 1000234,
            "homeOdds": 1.61,
            "drawOdds": 4.09,
            "awayOdds": 5.3
        },
        "betSelection": {
            "homeSelected": false,
            "drawSelected": false,
            "awaySelected": false
        }
    },
    {
        "eventId": 1000235,
        "compType": "EPL",
        "eventDesc": "Fulham vs West Ham United",
        "startTime": "2024-09-14T14:00:00.000Z",
        "teamsDetails": {
            "homeTeam": "Fulham",
            "awayTeam": "West Ham United"
        },
        "h2hEventOdds": {
            "eventId": 1000235,
            "homeOdds": 2.45,
            "drawOdds": 3.52,
            "awayOdds": 2.8
        },
        "betSelection": {
            "homeSelected": false,
            "drawSelected": false,
            "awaySelected": false
        }
    },
    {
        "eventId": 1000236,
        "compType": "EPL",
        "eventDesc": "Liverpool vs Nottingham Forest",
        "startTime": "2024-09-14T14:00:00.000Z",
        "teamsDetails": {
            "homeTeam": "Liverpool",
            "awayTeam": "Nottingham Forest"
        },
        "h2hEventOdds": {
            "eventId": 1000236,
            "homeOdds": 1.19,
            "drawOdds": 7.13,
            "awayOdds": 11.99
        },
        "betSelection": {
            "homeSelected": false,
            "drawSelected": false,
            "awaySelected": false
        }
    },
    {
        "eventId": 1000237,
        "compType": "EPL",
        "eventDesc": "Aston Villa vs Everton",
        "startTime": "2024-09-14T16:30:00.000Z",
        "teamsDetails": {
            "homeTeam": "Aston Villa",
            "awayTeam": "Everton"
        },
        "h2hEventOdds": {
            "eventId": 1000237,
            "homeOdds": 1.44,
            "drawOdds": 4.58,
            "awayOdds": 6.86
        },
        "betSelection": {
            "homeSelected": false,
            "drawSelected": false,
            "awaySelected": false
        }
    },
    {
        "eventId": 1000238,
        "compType": "EPL",
        "eventDesc": "Bournemouth vs Chelsea",
        "startTime": "2024-09-14T19:00:00.000Z",
        "teamsDetails": {
            "homeTeam": "Bournemouth",
            "awayTeam": "Chelsea"
        },
        "h2hEventOdds": {
            "eventId": 1000238,
            "homeOdds": 3.38,
            "drawOdds": 4.05,
            "awayOdds": 1.96
        },
        "betSelection": {
            "homeSelected": false,
            "drawSelected": false,
            "awaySelected": false
        }
    },
    {
        "eventId": 1000239,
        "compType": "EPL",
        "eventDesc": "Tottenham Hotspur vs Arsenal",
        "startTime": "2024-09-15T13:00:00.000Z",
        "teamsDetails": {
            "homeTeam": "Tottenham Hotspur",
            "awayTeam": "Arsenal"
        },
        "h2hEventOdds": {
            "eventId": 1000239,
            "homeOdds": 3.56,
            "drawOdds": 3.7,
            "awayOdds": 2
        },
        "betSelection": {
            "homeSelected": false,
            "drawSelected": false,
            "awaySelected": false
        }
    },
    {
        "eventId": 1000240,
        "compType": "EPL",
        "eventDesc": "Wolverhampton Wanderers vs Newcastle United",
        "startTime": "2024-09-15T15:30:00.000Z",
        "teamsDetails": {
            "homeTeam": "Wolverhampton Wanderers",
            "awayTeam": "Newcastle United"
        },
        "h2hEventOdds": {
            "eventId": 1000240,
            "homeOdds": 3.24,
            "drawOdds": 3.69,
            "awayOdds": 2.12
        },
        "betSelection": {
            "homeSelected": false,
            "drawSelected": false,
            "awaySelected": false
        }
    }
  ];
}

