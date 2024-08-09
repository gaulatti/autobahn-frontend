import { Store, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { lifecycle } from '../events/sagas';
import { reducers } from './reducers';

let store: Store;

/**
 * Retrieves the Redux store and persistor.
 * @returns An object containing the Redux store and persistor.
 */
const getStore = () => {
  if (!store) {
    const sagaMiddleware = createSagaMiddleware();

    const logger = createLogger({});

    store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware).concat(logger),
    });

    sagaMiddleware.run(lifecycle);
  }

  return { store };
};

export { getStore };
