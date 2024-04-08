import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { toast } from 'react-toastify';
import { signIn } from '.';
import API from '../../../../services/api';
import { AuthTypes } from '../../reducer/auth';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('signIn Saga', () => {
  it('should handle successful sign in', () => {
    const params = { email: 'test@gmail.com', password: 'test' };
    const token = 'test-token';
    const user = { id: 1, name: 'Test User' };

    return expectSaga(signIn, { params, type: AuthTypes.SIGN_IN_REQUEST })
      .provide([
        [call(API.login, params), token],
        [call(API.getUser), user],
      ])
      .put({
        type: AuthTypes.SIGN_IN_SUCCESS,
        isLoggedIn: true,
        user,
      })
      .run();
  });

  it('should handle sign in failure', () => {
    const params = { email: 'test@gmail.com', password: 'test' };
    const error = 'Sign in error';

    return expectSaga(signIn, { params, type: AuthTypes.SIGN_IN_REQUEST })
      .provide([[matchers.call.fn(API.login), throwError(new Error(error))]])
      .put({
        type: AuthTypes.SIGN_IN_FAILURE,
        error,
      })
      .run();
  });

  it('should display a success toast on successful sign in', () => {
    const params = { email: 'test@gmail.com', password: 'test' };
    const token = 'test-token';
    const user = { id: 1, name: 'Test User' };

    return expectSaga(signIn, { params, type: AuthTypes.SIGN_IN_REQUEST })
      .provide([[call(API.login, params), token]])
      .run()
      .then(() => {
        expect(toast.success).toHaveBeenCalledWith('Login successfully');
      });
  });

  it('should display an error toast on sign in failure', () => {
    const params = { email: 'test@gmail.com', password: 'test' };
    const error = 'Sign in error';

    return expectSaga(signIn, { params, type: AuthTypes.SIGN_IN_REQUEST })
      .provide([[matchers.call.fn(API.login), throwError(new Error(error))]])
      .run()
      .then(() => {
        expect(toast.error).toHaveBeenCalledWith('Sign in error');
      });
  });
});
