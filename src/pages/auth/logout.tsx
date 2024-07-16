import { useLogout } from '../../hooks/useAuth';

/**
 * Renders a component that logs out the user.
 */
const Logout = () => {
  const { logout } = useLogout();
  logout();

  window.location.href = '/';

  return <></>;
};

export { Logout };
