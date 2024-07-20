import { takeLatest } from '@redux-saga/core/effects';
import { fork } from 'redux-saga/effects';
import { checkSession, login, logout } from '../handlers/auth';

/**
 * Handles the authentication lifecycle.
 */
function* authLifecycle() {
  yield fork(checkSession);
  yield takeLatest('LOGIN', login);
  yield takeLatest('LOGOUT', logout);
}

export { authLifecycle };
