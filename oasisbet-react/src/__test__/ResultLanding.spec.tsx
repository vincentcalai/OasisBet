import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'
import ResultLanding from '../component/result/ResultLanding.tsx';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { fetchResults } from '../services/api/ApiService.ts';

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
  
  it('should render La Liga header when user selects La Liga comp type', () => {
    mockedFetchResults.mockResolvedValueOnce([]);

    render(
      <Provider store={store}>
        <ResultLanding />
      </Provider>
    );
    fireEvent.click(screen.getByText(/La Liga/i)); 
    const element = screen.getByRole('heading', { name: /La Liga/i });
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

});
