import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Store, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { lifecycle } from '../events/sagas';
import { reducers } from './reducers';
import localForage from 'localforage';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';

let store: Store;
let persistor: Persistor;

/**
 * Configures the localForage instance to be used as the storage engine for the redux-persist.
 */
localForage.config({
  driver: localForage.INDEXEDDB,
  name: 'madonna',
  version: 1.0,
  storeName: 'madonna',
});

/**
 * Configuration for the redux-persist.
 */
const persistConfig = {
  key: 'root',
  storage: localForage,
};

/**
 * Clears the persisted storage by purging the persistor and clearing the localForage.
 */
export const clearPersistedStorage = () => {
  persistor.purge();
  localForage.clear().then(() => {
    console.log('Cleared persisted storage');
  });
};

/**
 * Retrieves the Redux store and persistor.
 * @param apolloClient - The Apollo Client instance.
 * @returns An object containing the Redux store and persistor.
 */
const getStore = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  if (!store) {
    const sagaMiddleware = createSagaMiddleware();

    const persistedReducer = persistReducer(persistConfig, reducers);
    const logger = createLogger({});

    store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware).concat(logger),
    });

    sagaMiddleware.run(lifecycle, { apolloClient });

    persistor = persistStore(store);
  }

  return { store, persistor };
};

export { getStore };
