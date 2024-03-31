import { call, put } from 'redux-saga/effects';
import { AuthTypes } from '../../reducer/auth';
import Cookies from 'js-cookie';
import { LoginParams, User } from '../../../../../types';
import API from '../../../../services/api';
import { toast } from 'react-toastify';

export function* checkLoggedIn() {
  const token = Cookies.get('token');
  if (token) {
    API.addAuthorizationHeader(token);
    const user: User = yield call(API.getUser);
    yield put({
      type: AuthTypes.CHECK_LOGGED_IN_SUCCESS,
      isLoggedIn: true,
      user,
    });
  } else {
    yield put({
      type: AuthTypes.CHECK_LOGGED_IN_SUCCESS,
      isLoggedIn: false,
      user: null,
    });
  }
}

export function* signIn({ params, type }: { params: LoginParams; type: string }) {
  try {
    const token: string = yield call(API.login, params);
    if (token) {
      const user: User = yield call(API.getUser);
      toast.success('Login successfully');
      yield put({
        type: AuthTypes.SIGN_IN_SUCCESS,
        isLoggedIn: true,
        user,
      });
    }
  } catch (ex: any) {
    const error = ex?.response?.data?.error || ex?.message || 'Sign in error';
    toast.error(error);
    yield put({
      type: AuthTypes.SIGN_IN_FAILURE,
      error,
    });
  }
}

export function* signOut() {
  yield put({ type: AuthTypes.SIGN_OUT_SUCCESS });
  API.removeAuthorizationHeader();
  Cookies.remove('token');
}
