import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CreateUser from '../component/account/CreateUser';
import { screen, render } from '@testing-library/react';

const mockStore = configureMockStore();
const store = mockStore({
  error: {
    showError: false,
    errorText: "false"
  }
});

describe('CreateUser Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render CreateUser', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <CreateUser />
        </Provider>
      );
    });
    const username = screen.getByRole('textbox', { name: /User Name/i });
    expect(username).toBeDefined();
  });
  
});