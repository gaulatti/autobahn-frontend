import { Amplify } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { config } from './config.ts';
import { getStore } from './state/index.ts';
import { apolloClient } from './utils/helpers/apollo.ts';
/**
 * Configures Amplify with the provided configuration.
 */
Amplify.configure(config.aws);

/**
 * Creates the Redux store.
 */
const store = getStore(apolloClient);

/**
 * Renders the application.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
