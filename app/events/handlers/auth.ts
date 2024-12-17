import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { put, select } from 'redux-saga/effects';
import { SSEManager } from '../../engines/sse';
import { login as loginDispatcher, setAuthLoaded } from '../../state/dispatchers/auth';
import { setKickoff } from '../../state/dispatchers/lifecycle';
import { currentUser as currentUserSelector } from '../../state/selectors/auth';
import { getKickoffReady } from '../../state/selectors/lifecycle';

/**
 * Checks the user's session and dispatches the appropriate actions based on the session status.
 * @returns An unknown value.
 */
function* checkSession(): unknown {
  const session = yield fetchAuthSession();
  const isKickoffReady = yield select(getKickoffReady);

  const { userSub, tokens } = session;

  /**
   * If the user is authenticated, fetch the user attributes and dispatch the login action.
   */
  if (userSub && !isKickoffReady) {
    const { accessToken } = tokens;
    /**
     * Initialize the SSEManager with the access token.
     */
    SSEManager.getInstance(accessToken.toString());

    /**
     * Fetch the user attributes.
     */
    const user = yield fetchUserAttributes();
    const { given_name, family_name, email } = user;

    /**
     * If all required attributes are available, dispatch the login action.
     */
    yield put(loginDispatcher({ sub: userSub, given_name, last_name: family_name, email }));
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
