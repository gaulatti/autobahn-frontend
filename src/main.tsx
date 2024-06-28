import { Amplify } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { config } from './config.ts';

/**
 * Configures Amplify with the provided configuration.
 */
Amplify.configure(config.aws);

/**
 * Renders the application.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
