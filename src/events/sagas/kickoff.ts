import { takeLatest } from "redux-saga/effects";
import { kickoff } from "../handlers/kickoff";
import { SagaContext } from '.';

function* kickoffLifecycle(context: SagaContext) {
  /**
   * Load initial data once the essential information changes.
   *
   * This can be helpful when:
   * 1. The user is set (after login).
   */
  yield takeLatest("KICKOFF", kickoff, context);
}

export { kickoffLifecycle };
