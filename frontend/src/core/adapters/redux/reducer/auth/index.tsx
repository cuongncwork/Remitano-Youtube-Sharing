import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { User } from '../../../../../types';

const { Types, Creators } = createActions({});

export const INITIAL_STATE = Immutable({});

export const AuthTypes = Types;

export const authReducer = createReducer(INITIAL_STATE, {});

export const AuthActions = Creators;
