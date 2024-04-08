import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../App';
import { ToastContainer } from 'react-toastify';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('App', () => {
  let store;
  let component;

  beforeEach(() => {
    store = createStore(() => ({
      isLoggedIn: true,
      user: { id: 1, email: 'test@test.com' },
      error: null,
    }));

    component = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders Routing component', () => {
    expect(screen.getByTestId('routing')).toBeInTheDocument();
  });

  it('renders ToastContainer component', () => {
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });

  it('shows a toast notification when a new video is shared', () => {
    const video = { user: { id: 2, email: 'another@test.com' }, title: 'Test Video' };
    const mockToast = jest.fn();

    jest.spyOn(global, 'toast').mockImplementation(mockToast);

    // Simulate receiving a new video
    fireEvent(
      window,
      new MessageEvent('message', {
        data: JSON.stringify(video),
      }),
    );

    expect(mockToast).toHaveBeenCalledWith(
      expect.stringContaining('User another@test.com shared new movie Test Video'),
      expect.objectContaining({ position: 'bottom-right' }),
    );
  });

  it('shows an error toast when there is an error', () => {
    store = createStore(() => ({
      isLoggedIn: true,
      user: { id: 1, email: 'test@test.com' },
      error: 'Test error',
    }));

    component = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});
