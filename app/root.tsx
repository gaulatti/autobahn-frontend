import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Amplify, ResourcesConfig } from 'aws-amplify';
import { Provider } from 'react-redux';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';
import stylesheet from './app.css?url';
// import { useDarkMode } from './hooks/useDarkMode';
import { getStore } from './state';

/**
 * This is important. It enables the OAuth listener for the Auth module.
 *
 * For some reason this is not required in local development, but it is
 * required in production.
 */
import 'aws-amplify/auth/enable-oauth-listener';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }];

/**
 * Configuration for the application.
 *
 * Why this way? Because when running in prod, using import.meta.env
 * directly in the object does not work. Don't ask me why, but only
 * this way works.
 */
const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const userPoolClientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const userPoolDomain = import.meta.env.VITE_USER_POOL_DOMAIN;
const fqdn = import.meta.env.VITE_FQDN;

const config: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId,
      userPoolClientId,
      loginWith: {
        oauth: {
          domain: userPoolDomain,
          scopes: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
          redirectSignIn: ['http://localhost:5173', fqdn],
          redirectSignOut: ['http://localhost:5173/logout', `${fqdn}/logout`],
          responseType: 'code',
        },
      },
    },
  },
};

Amplify.configure(config);

/**
 * Creates the Redux store.
 */
const { store } = getStore();

export function Layout({ children }: { children: React.ReactNode }) {
  // const { isDarkMode } = useDarkMode();

  /**
   * The appearance prop is used to set the theme of the application, by now
   * we are only doing light, dark mode is not implemented yet.
   *
   * To implement add: appearance={isDarkMode ? 'dark' : 'light'} to Theme.
   */

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='anthem' content='https://www.youtube.com/watch?v=i64wakSeVco' />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <Theme accentColor='orange' grayColor='sand' radius='large'>
            {children}
            <ScrollRestoration />
            <Scripts />
          </Theme>
        </Provider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
