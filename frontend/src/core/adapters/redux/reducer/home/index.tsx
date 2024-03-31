import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { Video } from '../../../../../types';

const { Types, Creators } = createActions({});

export const INITIAL_STATE = Immutable<{}>({});

export const HomeTypes = Types;

export const homeReducer = createReducer(INITIAL_STATE, {});

export const HomeActions = Creators;
