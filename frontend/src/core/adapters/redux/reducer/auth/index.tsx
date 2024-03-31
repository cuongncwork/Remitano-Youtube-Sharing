import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { User } from '../../../../../types';

const { Types, Creators } = createActions({
  checkLoggedIn: [],
  checkLoggedInSuccess: ['token'],

  signIn: ['params'],
  signInSuccess: ['token'],
  signInFailure: ['error'],

  signOut: [],
  signOutSuccess: [],
});

export const INITIAL_STATE = Immutable({
  error: null,
  isProcessing: false,
  isLoggedIn: false,
  user: null,
});

const checkLoggedIn = (state = INITIAL_STATE) => state;

const checkLoggedInSuccess = (
  state = INITIAL_STATE,
  { isLoggedIn, user }: { isLoggedIn: boolean; user: User },
) => state.set('isLoggedIn', isLoggedIn).set('user', user);

const requestAuth = (state = INITIAL_STATE) => {
  return state.set('isProcessing', true).set('error', null);
};

const requestAuthSuccess = (
  state = INITIAL_STATE,
  { isLoggedIn, user }: { isLoggedIn: boolean; user: User },
) => {
  const nextState = state
    .set('isLoggedIn', isLoggedIn)
    .set('user', user)
    .set('error', null)
    .set('isProcessing', false);
  return nextState;
};

const requestAuthFailure = (state = INITIAL_STATE, { error }: { error: string }) => {
  return state.set('error', error).set('isProcessing', false);
};

const signOut = (state = INITIAL_STATE) => state;

const signOutSuccess = (state = INITIAL_STATE) => INITIAL_STATE;

export const AuthTypes = Types;

export const authReducer = createReducer(INITIAL_STATE, {
  [Types.CHECK_LOGGED_IN]: checkLoggedIn,
  [Types.CHECK_LOGGED_IN_SUCCESS]: checkLoggedInSuccess,
  [Types.SIGN_IN]: requestAuth,
  [Types.SIGN_IN_SUCCESS]: requestAuthSuccess,
  [Types.SIGN_IN_FAILURE]: requestAuthFailure,
  [Types.SIGN_OUT]: signOut,
  [Types.SIGN_OUT_SUCCESS]: signOutSuccess,
});

export const AuthActions = Creators;
