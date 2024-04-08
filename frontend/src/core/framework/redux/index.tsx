/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from '../../adapters/redux/sagas';
import { homeReducer } from '../../adapters/redux/reducer/home';
import { authReducer } from '../../adapters/redux/reducer/auth';

/* Reducers */
const reducers = {
  home: homeReducer,
  auth: authReducer,
};

/* Redux-Persist */
export const rootReducer = persistCombineReducers(
  {
    key: 'root',
    storage,
    whitelist: [],
  },
  reducers,
);

/* Saga */
const sagaMiddleware = createSagaMiddleware();

/* Create Store */
export const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware)));

/* Redux-Persist + Store */
export const persistor = persistStore(store);

/* Run saga */
sagaMiddleware.run(rootSaga);
