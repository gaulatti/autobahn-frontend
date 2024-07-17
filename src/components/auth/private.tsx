import { fetchAuthSession } from 'aws-amplify/auth';
import { ReactNode, useEffect, useState } from 'react';
import { Header } from '../header';
import { useSelector } from 'react-redux';
import { getKickoffReady } from '../../state/selectors/lifecycle';
import { Spinner } from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';

/**
 * A private route component that checks if the user is authenticated and if the kickoff is ready.
 * If the user is not authenticated or the kickoff is not ready, it displays a loading spinner.
 * Otherwise, it renders the provided element along with a header.
 *
 * @param props - The component props.
 * @param props.element - The element to render when the user is authenticated and the kickoff is ready.
 * @returns The private route component.
 */
const PrivateRoute = (props: { element: () => ReactNode; }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isKickoffReady = useSelector(getKickoffReady);
  const navigate = useNavigate()

  /**
   * Fetches the auth session and updates the app state accordingly.
   */
  useEffect(() => {
    fetchAuthSession().then((authSession) => {
      setIsAuthenticated(!!authSession.userSub);
      if (!authSession.userSub) {
        navigate('/login');
      }
    });
  }, [navigate]);

  /**
   * Renders a loading spinner if the user is not authenticated or the kickoff is not ready.
   */
  if (!isAuthenticated || !isKickoffReady) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size='huge' />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className='flex justify-center'>
          { props.element() }
      </main>
    </>
  );
};

export { PrivateRoute };
