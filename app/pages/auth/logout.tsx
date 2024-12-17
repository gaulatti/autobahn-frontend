import { Navigate } from 'react-router';
import { useLogout } from '../../hooks/useAuth';
/**
 * Renders a component that logs out the user.
 */
const Logout = () => {
  const { logout } = useLogout();

  /**
   * Logs out the user.
   */
  logout();

  /**
   * Redirects the user to the home page.
   */
  return <Navigate to='/' replace />;
};

export default Logout;
