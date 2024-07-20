import { fetchAuthSession, fetchUserAttributes, FetchUserAttributesOutput, signOut } from 'aws-amplify/auth';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginDispatcher, logout as logoutDispatcher, setAuthLoaded } from '../state/dispatchers/auth';
import { currentUser as currentUserSelector, isAuthenticated as isAuthenticatedSelector, isLoaded as isLoadedSelector } from '../state/selectors/auth';

/**
 * Custom hook for handling authentication logic.
 */
const useAuth = () => {
  const { isAuthenticated, isLoaded } = useAuthStatus();
  const dispatch = useDispatch();

  /**
   * Verify if there's an active user.
   *
   * If not, setting the user as undefined
   * should redirect to the login page as
   * the layout is constantly monitoring
   * the user state.
   */
  const login = useCallback((): void => {

    fetchAuthSession().then(({ userSub }) => {
      if (userSub) {
        fetchUserAttributes()
          .then((attributes: FetchUserAttributesOutput) => {
            const { sub: id, family_name: last_name, given_name: name, email } = attributes;
            if (id && name && last_name && email) {
              dispatch(loginDispatcher({ id, name, last_name, email }));
            }
          })
      } else {
        dispatch(setAuthLoaded());
      }
    });
  }, [dispatch]);

  /**
   * Listen to any auth events and do a login
   * attempt if needed.
   */
  useEffect(login, [isAuthenticated, isLoaded, login]);
};

/**
 * Custom hook for handling user logout.
 * This hook checks if the user is authenticated and loaded,
 * and performs a logout on the cognito side, and then removes
 * any references to the user in the local store.
 *
 * @returns An object containing the `logout` function.
 */
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
