import { Spinner } from '@fluentui/react-components';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuth';
import { getKickoffReady } from '../../state/selectors/lifecycle';
import { getTeams } from '../../state/selectors/teams';
import { Header } from '../header';

/**
 * A private route component that checks if the user is authenticated and if the kickoff is ready.
 * If the user is not authenticated or the kickoff is not ready, it displays a loading spinner.
 * Otherwise, it renders the provided element along with a header.
 *
 * @param props - The component props.
 * @param props.element - The element to render when the user is authenticated and the kickoff is ready.
 * @returns The private route component.
 */
const PrivateRoute = (props: { element: () => ReactNode }) => {
  const { isAuthenticated, isLoaded } = useAuthStatus();
  const teams = useSelector(getTeams);
  const isKickoffReady = useSelector(getKickoffReady);

  /**
   * Renders the login page if the user is not authenticated.
   */
  if (isLoaded && !isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  /**
   * Renders the Private Layout if the user is authenticated and the kickoff is ready.
   */
  if (isLoaded && isAuthenticated && isKickoffReady) {
    return (
      <>
        <Header />
        {teams.length ? <main className='flex justify-center'>{props.element()}</main> : <>no teams</>}
      </>
    );
  }

  /**
   * Renders a loading spinner if the user is not authenticated or the kickoff is not ready.
   */
  return (
    <div className='flex justify-center items-center h-screen'>
      <Spinner size='huge' />
    </div>
  );
};

export { PrivateRoute };
