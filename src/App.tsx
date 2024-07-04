import { fetchAuthSession, signInWithRedirect } from 'aws-amplify/auth';
import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { useLifecycle } from './hooks/useLifecycle';
import { Home } from './pages';
import { ProjectsAdmin } from './pages/admin/projects';
import { SchedulesAdmin } from './pages/admin/schedules';
import { UsersAdmin } from './pages/admin/users';
import { Logout } from './pages/auth/logout';

function App() {
  /**
   * Manages the lifecycle of the application.
   */
  useLifecycle();

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
      path: '/admin/users',
      element: <UsersAdmin />,
    },
    {
      path: '/admin/projects',
      element: <ProjectsAdmin />,
    },
    {
      path: '/admin/schedules',
      element: <SchedulesAdmin />,
    },
    {
      path: 'logout',
      element: <Logout />,
    },
  ]);

  return authenticatedUser && <RouterProvider router={router} />;
}

export default App;
