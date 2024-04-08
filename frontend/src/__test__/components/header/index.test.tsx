import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '.';
import { LoginParams, StateProp } from '../../types';

const mockStore = configureStore([]);

describe('Header Component', () => {
  it('dispatches signIn action with form data on submit', async () => {
    const store = mockStore({
      auth: {
        isLoggedIn: false,
        user: null,
        isProcessing: false,
      },
    });

    store.dispatch = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(getByText('Login / Register'));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'SIGN_IN',
        params: { email: 'test@example.com', password: 'password123' },
      });
    });
  });

  it('dispatches signOut action on logout button click', async () => {
    const store = mockStore({
      auth: {
        isLoggedIn: true,
        user: { id: 1, email: 'test@example.com' },
        isProcessing: false,
      },
    });

    store.dispatch = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    fireEvent.click(getByText('Logout'));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'SIGN_OUT',
      });
    });
  });
});
