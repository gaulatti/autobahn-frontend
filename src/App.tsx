import { fetchAuthSession, signInWithRedirect } from 'aws-amplify/auth';
import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Home } from './pages';
import { Logout } from './pages/auth/logout';

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(false);

  /**
   * Redirects the user to the sign-in page if they are not signed in.
   */
  fetchAuthSession().then((authSession) => {
    if (!authSession.userSub) {
      signInWithRedirect({ provider: { custom: 'Okta' } });
    } else {
      setAuthenticatedUser(true);
    }
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'logout',
      element: <Logout />
    },
  ]);

  return authenticatedUser && <RouterProvider router={router} />;
}

export default App;
