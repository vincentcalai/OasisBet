import React from 'react';
import { render, screen } from '@testing-library/react'
import ResultLanding from '../component/result/ResultLanding.tsx';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({
  error: {
    showError: false,
    errorText: "false"
  }
});

test('should render Comp Type Header', () => {
  render(
    <Provider store={store}>
      <ResultLanding />
    </Provider>
  );
  const element = screen.getByRole('heading', { name: /English Premier League/i });
  expect(element).toBeDefined();
});