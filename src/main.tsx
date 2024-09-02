import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Amplify } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { config } from './config.ts';
import { getStore } from './state/index.ts';
import { Theme } from '@radix-ui/themes';

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
    <Theme>
      <FluentProvider theme={webLightTheme}>
        <Provider store={store}>
          <App />
        </Provider>
      </FluentProvider>
    </Theme>
  </React.StrictMode>
);
