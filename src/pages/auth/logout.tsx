import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useAuth';
/**
 * Renders a component that logs out the user.
 */
const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  logout();

  navigate('/');
};

export { Logout };
