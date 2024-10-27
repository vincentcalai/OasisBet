import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import MainMenu from './MainMenu.tsx';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

jest.mock('./NavMenu.tsx', () => () => <div>NavMenu Component</div>);
jest.mock('./LoginMenu.tsx', () => () => <div>LoginMenu Component</div>);
jest.mock('./Spinner.tsx', () => () => <div>Spinner Component</div>);

const mockStore = configureMockStore();
const store = mockStore({
  error: {
    showError: false,
    errorText: ""
  },
  modal: {
    logoutModal: false
  }
});

describe('Main Menu Component', () => {
  it('should render all child components', () => {
    render(
      <Provider store={store}>
          <MemoryRouter>
            <MainMenu />
          </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('NavMenu Component')).toBeDefined();
    expect(screen.getByText('LoginMenu Component')).toBeDefined();
    expect(screen.getByText('Spinner Component')).toBeDefined();
  });
});
