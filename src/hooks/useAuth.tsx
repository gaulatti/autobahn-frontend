import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginDispatcher, logout as logoutDispatcher } from '../state/dispatchers/auth';
import { currentUser as currentUserSelector, isAuthenticated as isAuthenticatedSelector, isLoaded as isLoadedSelector } from '../state/selectors/auth';

const useAuth = () => {
  const { isAuthenticated, isLoaded } = useAuthStatus();
  const dispatch = useDispatch();

  console.log('useauth');
  /**
   * Verify if there's an active user.
   *
   * If not, setting the user as undefined
   * should redirect to the login page.
   */
  const login = (): void => {
    if (!isAuthenticated) {

      fetchAuthSession()
        .then((attributes) => {
          const { accessToken: { payload: { sub, username } } } = attributes.tokens!
          if (sub && username) {
            dispatch(loginDispatcher({ id: sub, username: username as string }));
          }
        })
        .catch((e) => {
          console.error(e);
          dispatch(loginDispatcher(undefined));
        });
    }
  };

  /**
   * Listen to any auth events and do a login
   * attempt if needed.
   */
  useEffect(login, [isAuthenticated, isLoaded, login]);
};

const useLogout = () => {
  const { isAuthenticated, isLoaded } = useAuthStatus();
  const dispatch = useDispatch();

  /**
   * Do a logout on the cognito side, and
   * then remove any references to the user
   * in the local store.
   */
  const logout = (): void => {
    if (isAuthenticated && isLoaded) {
      signOut().then(() => {
        dispatch(logoutDispatcher());
      });
    }
  };

  return {
    logout,
  };
};

const useAuthStatus = () => {
  /**
   * If there's an active cognito user.
   */
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  /**
   * If the process to verify if there's an active user
   * has finished or not.
   */
  const isLoaded = useSelector(isLoadedSelector);

  /**
   * Get a minimal representation of the current user.
   */
  const currentUser = useSelector(currentUserSelector);

  return {
    isAuthenticated,
    isLoaded,
    currentUser,
  };
};

export { useAuth, useAuthStatus, useLogout };
