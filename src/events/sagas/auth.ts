import { takeLatest } from '@redux-saga/core/effects';
import { checkSession, login, logout } from '../handlers/auth';

/**
 * Handles the authentication lifecycle.
 */
function* authLifecycle() {
  yield takeLatest('persist/REHYDRATE', checkSession);
  yield takeLatest('LOGIN', login);
  yield takeLatest('LOGOUT', logout);
}

export { authLifecycle };
