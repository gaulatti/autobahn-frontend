import { signInWithRedirect } from 'aws-amplify/auth';
import { Navigate } from 'react-router';
import { useAuthStatus } from '../../hooks/useAuth';

/**
 * Login component for user authentication.
 * Renders a login page with background image and sign-in options.
 */
const Login = () => {
  const { isAuthenticated, isLoaded } = useAuthStatus();

  /**
   * Redirect the user to the home page if they are authenticated.
   */
  if (isLoaded && isAuthenticated) {
    return <Navigate to='/' />;
  }

  /**
   * Redirect the user to the sign-in page.
   */
  signInWithRedirect({ provider: { custom: 'Google' } });
};

export default Login;
