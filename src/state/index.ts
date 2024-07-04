import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Store, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { lifecycle } from '../events/sagas';
import { reducers } from './reducers';

let store: Store | undefined;

const getStore = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  if (!store) {
    const sagaMiddleware = createSagaMiddleware();

    store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    });

    sagaMiddleware.run(lifecycle, { apolloClient });
  }

  return store;
};

export { getStore };
