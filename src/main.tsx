import { Amplify } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { config } from './config.ts';
import { getStore } from './state/index.ts';

/**
 * This is important. It enables the OAuth listener for the Auth module.
 *
 * For some reason this is not required in local development, but it is
 * required in production.
 */
import 'aws-amplify/auth/enable-oauth-listener';

/**
 * Configures Amplify with the provided configuration.
 */
Amplify.configure(config.aws);

/**
 * Creates the Redux store.
 */
const { store } = getStore();

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
