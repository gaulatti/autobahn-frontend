import { takeLatest } from "@redux-saga/core/effects";
import { login, logout } from "../handlers/auth";

/**
 * Handles the authentication lifecycle.
 */
function* authLifecycle() {
  yield takeLatest("LOGIN", login);
  yield takeLatest("LOGOUT", logout);
}

export { authLifecycle };
