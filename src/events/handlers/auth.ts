import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { put, select } from 'redux-saga/effects';
import { login as loginDispatcher, setAuthLoaded } from '../../state/dispatchers/auth';
import { setKickoff } from '../../state/dispatchers/lifecycle';
import { currentUser as currentUserSelector } from '../../state/selectors/auth';
import { getKickoffReady } from '../../state/selectors/lifecycle';
import { WebSocketManager } from '../../engines/sockets';

/**
 * Checks the user's session and dispatches the appropriate actions based on the session status.
 * @returns An unknown value.
 */
function* checkSession(): unknown {
  const { userSub, tokens } = yield fetchAuthSession();
  const isKickoffReady = yield select(getKickoffReady);

  /**
   * If the user is authenticated, fetch the user attributes and dispatch the login action.
   */
  if (userSub && !isKickoffReady) {
    const { sub: id, family_name: lastName, given_name: name, email } = yield fetchUserAttributes();

    const { accessToken } = tokens;

    /**
     * Initialize the WebSocketManager with the access token.
     */
    WebSocketManager.getInstance(accessToken.toString());

    /**
     * If all required attributes are available, dispatch the login action.
     */
    if (id && name && lastName && email) {
      yield put(loginDispatcher({ id, name, lastName, email }));
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

export { checkSession, login };
