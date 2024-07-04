import { ResourcesConfig } from 'aws-amplify';
import { AmplifyOutputs, LegacyConfig } from 'aws-amplify/adapter-core';

/**
 * Configuration for the application.
 */
type Config = {
  aws: ResourcesConfig | LegacyConfig | AmplifyOutputs;
};
const config: Config = {
  aws: {
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
        loginWith: {
          oauth: {
            domain: import.meta.env.VITE_USER_POOL_DOMAIN,
            scopes: ['openid','email'],
            redirectSignIn: [`https://${import.meta.env.VITE_PROD_FQDN}`, 'http://localhost:5173'],
            redirectSignOut: [`https://${import.meta.env.VITE_PROD_FQDN}/logout`, 'http://localhost:5173/logout'],
            responseType: 'code',
          },
        },
      },
    },
  },
};

export { config };
