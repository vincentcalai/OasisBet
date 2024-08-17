import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import ResultLanding from '../component/result/ResultLanding.tsx';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { fetchResults } from '../services/api/ApiService.ts';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const store = mockStore({
  error: {
    showError: false,
    errorText: "false"
  }
});

jest.mock('../services/api/ApiService.ts'); // Mock the module
const mockedFetchResults = fetchResults as jest.MockedFunction<typeof fetchResults>;

describe('ResultLanding Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render English Premier League as default Comp Type Header', () => {
    render(
      <Provider store={store}>
        <ResultLanding />
      </Provider>
    );
    const element = screen.getByRole('heading', { name: /English Premier League/i });
    expect(element).toBeDefined();
  });
  
  it('should render correct header when user selects comp type', async () => {
    const user = userEvent.setup();
    mockedFetchResults.mockResolvedValueOnce([]);

    render(
      <Provider store={store}>
        <ResultLanding />
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

  it('should render No Event Found text if api returns no events', () => {
    mockedFetchResults.mockResolvedValueOnce([]);

    render(
      <Provider store={store}>
        <ResultLanding />
      </Provider>
    );
    const element = screen.getByText('No Event(s) Found.');
    expect(element).toBeDefined();
  });

  it('should render No Event Found text if api returns no events', () => {
    mockedFetchResults.mockResolvedValueOnce([]);

    render(
      <Provider store={store}>
        <ResultLanding />
      </Provider>
    );
    const element = screen.getByText('No Event(s) Found.');
    expect(element).toBeDefined();
  });

  it('should render correct values if api returns events', async () => {
    mockedFetchResults.mockResolvedValueOnce(getMockedResult());

    render(
      <Provider store={store}>
        <ResultLanding />
      </Provider>
    );
    // Wait for the elements related to the mocked data to be present in the document
    await waitFor(() => {
      expect(screen.queryByText('No Event(s) Found.')).toBeNull();
      expect(screen.getByText('Athletic Bilbao vs Getafe')).toBeDefined();
      expect(screen.getByText('Real Betis vs Girona')).toBeDefined();
    });
  });
  
});


function getMockedResult(): any {
  return [
    {
      "awayTeam": "Getafe",
      "compType": "soccer_spain_la_liga",
      "completed": true,
      "eventDesc": "Athletic Bilbao vs Getafe",
      "eventId": 2000190,
      "homeTeam": "Athletic Bilbao",
      "lastUpdatedDt": "2024-08-16T01:41:20.502+00:00",
      "score": "1-1",
      "startTime": "Fri Aug 16 2024 01:00:00 GMT+0800 (Singapore Standard Time)"
    },
    {
      "awayTeam": "Girona",
      "compType": "soccer_spain_la_liga",
      "completed": true,
      "eventDesc": "Real Betis vs Girona",
      "eventId": 2000191,
      "homeTeam": "Real Betis",
      "lastUpdatedDt": "2024-08-16T01:41:20.594+00:00",
      "score": "1-1",
      "startTime": "Fri Aug 16 2024 03:30:00 GMT+0800 (Singapore Standard Time)"
    }
  ];
}

