import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Amplify } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { config } from './config.ts';
import { getStore } from './state/index.ts';
import { apolloClient } from './utils/helpers/apollo.ts';
import { ApolloProvider } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';

/**
 * Configures Amplify with the provided configuration.
 */
Amplify.configure(config.aws);

/**
 * Creates the Redux store.
 */
const { store, persistor } = getStore(apolloClient);

/**
 * Renders the application.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </FluentProvider>
  </React.StrictMode>
);
