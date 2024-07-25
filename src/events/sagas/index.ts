import { fork } from 'redux-saga/effects';
import { authLifecycle } from './auth';
import { kickoffLifecycle } from './kickoff';
import { teamsLifecycle } from './teams';


function* lifecycle() {
  yield fork(authLifecycle);
  yield fork(kickoffLifecycle);
  yield fork(teamsLifecycle);
}

export { lifecycle };
