import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CreateUser from './CreateUser';
import { screen, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { createUser } from '../../services/api/ApiService';

const mockStore = configureMockStore();
const store = mockStore({
  error: {
    showError: false,
    errorText: ""
  }
});

jest.mock('../../services/api/ApiService.ts');
const mockedCreateUserResult = createUser as jest.MockedFunction<typeof createUser>;

describe('CreateUser Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render CreateUser elements', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateUser />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText(/User Name/i);
    expect(usernameInput).toBeDefined();
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeDefined();
    const cfmPasswordInput = screen.getByLabelText('Confirm Password');
    expect(cfmPasswordInput).toBeDefined();
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeDefined();
    const contactNoInput = screen.getByLabelText(/Contact No/i);
    expect(contactNoInput).toBeDefined();
    const button = screen.getByRole('button', { name: /Register/i });
    expect(button).toBeDefined();
  });

  it('should not display dialog when fields are invalid', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateUser />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText(/User Name/i);
    expect(usernameInput).toBeDefined();
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeDefined();
    const cfmPasswordInput = screen.getByLabelText('Confirm Password');
    expect(cfmPasswordInput).toBeDefined();
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeDefined();
    const contactNoInput = screen.getByLabelText(/Contact No/i);
    expect(contactNoInput).toBeDefined();
    const button = screen.getByRole('button', { name: /Register/i });
    expect(button).toBeDefined();

    expect(screen.queryByText('Confirm Create User')).toBeNull();
    expect(screen.queryByText('Are you sure to create a new user?')).toBeNull();
  });

  it('should display dialog when click Register button when all fields are valid', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CreateUser />
          </MemoryRouter>
        </Provider>
      );
    });
    const usernameInput = screen.getByLabelText(/User Name/i);
    await user.type(usernameInput, 'MICHEAL'); 
    expect(usernameInput).toBeDefined();
    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'password');
    expect(passwordInput).toBeDefined();
    const cfmPasswordInput = screen.getByLabelText('Confirm Password');
    await user.type(cfmPasswordInput, 'password');
    expect(cfmPasswordInput).toBeDefined();
    const emailInput = screen.getByLabelText(/Email/i);
    await user.type(emailInput, 'TEST@TEST.COM');
    expect(emailInput).toBeDefined();
    const contactNoInput = screen.getByLabelText(/Contact No/i);
    await user.type(contactNoInput, '90001111');
    expect(contactNoInput).toBeDefined();
    const button = screen.getByRole('button', { name: /Register/i });
    await user.click(button);

    const dialogHeader = screen.getByText(/Confirm Create User/i);
    const dialogMsg = screen.getByText(/Are you sure to create a new user?/i);
    expect(dialogHeader).toBeDefined();
    expect(dialogMsg).toBeDefined();
  });
  
  it('should not display dialog when fields are invalid', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateUser />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText(/User Name/i);
    expect(usernameInput).toBeDefined();
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeDefined();
    const cfmPasswordInput = screen.getByLabelText('Confirm Password');
    expect(cfmPasswordInput).toBeDefined();
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeDefined();
    const contactNoInput = screen.getByLabelText(/Contact No/i);
    expect(contactNoInput).toBeDefined();
    const button = screen.getByRole('button', { name: /Register/i });
    expect(button).toBeDefined();

    expect(screen.queryByText('Confirm Create User')).toBeNull();
    expect(screen.queryByText('Are you sure to create a new user?')).toBeNull();
  });

  it('should not show error message when user is successfully created', async () => {
      mockedCreateUserResult.mockResolvedValueOnce({
        statusCode: 0,
        resultMessage: 'User created successfully',
      });
      const user = userEvent.setup();

      await act(async () => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <CreateUser />
            </MemoryRouter>
          </Provider>
        );
      });
      const usernameInput = screen.getByLabelText(/User Name/i);
      await user.type(usernameInput, 'MICHEAL'); 
      const passwordInput = screen.getByLabelText('Password');
      await user.type(passwordInput, 'password');
      const cfmPasswordInput = screen.getByLabelText('Confirm Password');
      await user.type(cfmPasswordInput, 'password');
      const emailInput = screen.getByLabelText(/Email/i);
      await user.type(emailInput, 'TEST@TEST.COM');
      const contactNoInput = screen.getByLabelText(/Contact No/i);
      await user.type(contactNoInput, '90001111');
      const button = screen.getByRole('button', { name: /Register/i });
      await user.click(button);
  
      const dialogHeader = screen.getByText(/Confirm Create User/i);
      const dialogMsg = screen.getByText(/Are you sure to create a new user?/i);
      expect(dialogHeader).toBeDefined();
      expect(dialogMsg).toBeDefined();

      const cfmButton = screen.getByRole('button', { name: /Confirm/i });
      await user.click(cfmButton);
      expect(screen.queryByText(/Error creating user/i)).toBeNull();
  })

  it('should show error message when create user has failed', async () => {
    mockedCreateUserResult.mockResolvedValueOnce({
      statusCode: 2,
      resultMessage: 'Username already existed. Please use another username',
    });
    const user = userEvent.setup();

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CreateUser />
          </MemoryRouter>
        </Provider>
      );
    });
    const usernameInput = screen.getByLabelText(/User Name/i);
    await user.type(usernameInput, 'MICHEAL'); 
    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'password');
    const cfmPasswordInput = screen.getByLabelText('Confirm Password');
    await user.type(cfmPasswordInput, 'password');
    const emailInput = screen.getByLabelText(/Email/i);
    await user.type(emailInput, 'TEST@TEST.COM');
    const contactNoInput = screen.getByLabelText(/Contact No/i);
    await user.type(contactNoInput, '90001111');
    const button = screen.getByRole('button', { name: /Register/i });
    await user.click(button);

    const dialogHeader = screen.getByText(/Confirm Create User/i);
    const dialogMsg = screen.getByText(/Are you sure to create a new user?/i);
    expect(dialogHeader).toBeDefined();
    expect(dialogMsg).toBeDefined();

    const cfmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.click(cfmButton);
    await waitFor(() => {
      expect(screen.queryByText(/Username already existed. Please use another username/i)).not.toBeNull();
    });
})

});