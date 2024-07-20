import { put, select } from 'redux-saga/effects';
import { setKickoff } from '../../state/dispatchers/lifecycle';
import { currentUser as currentUserSelector } from '../../state/selectors/auth';
import { clearPersistedStorage } from '../../state';
import { getKickoffReady } from '../../state/selectors/lifecycle';
import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { setAuthLoaded } from '../../state/dispatchers/auth';
import { login as loginDispatcher } from '../../state/dispatchers/auth';

/**
 * Checks the user's session and dispatches the appropriate actions based on the session status.
 * @returns An unknown value.
 */
function* checkSession(): unknown {
  const { userSub } = yield fetchAuthSession();

  /**
   * If the user is authenticated, fetch the user attributes and dispatch the login action.
   */
  if (userSub) {
    const { sub: id, family_name: last_name, given_name: name, email } = yield fetchUserAttributes();

    /**
     * If all required attributes are available, dispatch the login action.
     */
    if (id && name && last_name && email) {
      yield put(loginDispatcher({ id, name, last_name, email }));
    }
  } else {
    /**
     * If the user is not authenticated, dispatch the setAuthLoaded action.
     */
    yield put(setAuthLoaded());
  }
}

/**
 * Performs the login process.
 *
 * @returns An unknown value.
 */
function* login(): unknown {
  try {
    /**
     * Verify if there's a user before running kickoff
     */
    const currentUser = yield select(currentUserSelector);
    const isKickoffReady = yield select(getKickoffReady);

    if (currentUser && !isKickoffReady) {
      yield put(setKickoff());
    }
  } catch (e) {
    console.error('Error when setting login', e);
  }
}

/**
 * Logs out the user by clearing persisted storage.
 * @returns A generator object.
 */
function* logout(): unknown {
  try {
    yield clearPersistedStorage();
  } catch (e) {
    console.error('Error when setting logout', e);
  }
}

export { login, logout, checkSession };
