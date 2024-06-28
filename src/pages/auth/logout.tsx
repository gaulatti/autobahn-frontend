import { signOut } from 'aws-amplify/auth';
import { useEffect } from 'react';

/**
 * Renders a component that logs out the user.
 */
const Logout = () => {
  useEffect(() => {
    signOut();
  }, []);

  return <></>;
};

export { Logout };
