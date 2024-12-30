import { Footer } from '@/components/layout/footer';
import { Flex } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { Header } from '~/components/layout/header';
import { OverlaySpinner } from '~/components/spinners';
import { useAuthStatus } from '~/hooks/useAuth';
import { getKickoffReady } from '~/state/selectors/lifecycle';

/**
 * PrivateLayout component that handles the rendering of the private layout.
 *
 * This component checks the authentication status and the readiness of the kickoff
 * to determine what to render:
 * - If the user is authenticated, the authentication status is loaded, and the kickoff is ready,
 *   it renders the child components using the <Outlet /> component.
 * - If the authentication status is loaded but the user is not authenticated, it redirects to the login page.
 * - If the authentication status is not loaded or the kickoff is not ready, it renders a loading spinner.
 *
 * @returns {JSX.Element} The appropriate component based on the authentication and kickoff status.
 */
const PrivateLayout = (): JSX.Element => {
  const { isAuthenticated, isLoaded } = useAuthStatus();
  const isKickoffReady = useSelector(getKickoffReady);

  if (isAuthenticated && isLoaded && isKickoffReady) {
    return (
      <Flex direction='column' justify='between' style={{ minHeight: '100vh' }}>
        <main>
          <Header />
          <Outlet />
        </main>
        <Footer />
      </Flex>
    );
  }

  /**
   * Redirects to the login page if the user is not authenticated
   * and the current page is not a public page.
   */
  if (isLoaded && !isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  /**
   * Renders a loading spinner if the user is not authenticated
   * or the kickoff is not ready.
   */
  return <OverlaySpinner />;
};

export default PrivateLayout;
