import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Store, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { lifecycle } from '../events/sagas';
import { reducers } from './reducers';
import localForage from 'localforage';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
let store: Store;
let persistor: Persistor;

localForage.config({
  driver: localForage.INDEXEDDB,
  name: 'madonna',
  version: 1.0,
  storeName: 'madonna',
});

const persistConfig = {
  key: 'root',
  storage: localForage,
};

const getStore = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  if (!store) {
    const sagaMiddleware = createSagaMiddleware();

    const persistedReducer = persistReducer(persistConfig, reducers);

    store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    });

    sagaMiddleware.run(lifecycle, { apolloClient });

    persistor = persistStore(store);
  }

  return { store, persistor };
};

export { getStore };
