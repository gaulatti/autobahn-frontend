import { takeLatest } from "@redux-saga/core/effects";
import { login } from "../handlers/auth";
function* authLifecycle() {
  yield takeLatest("LOGIN", login);
}

export { authLifecycle };
