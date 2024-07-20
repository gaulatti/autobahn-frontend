import { put, select } from 'redux-saga/effects';
import { setKickoff } from '../../state/dispatchers/lifecycle';
import { currentUser as currentUserSelector } from '../../state/selectors/auth';
import { clearPersistedStorage } from '../../state';

function* login(): unknown {
  try {
    /**
     * Verify if there's a user before running kickoff
     */
    const currentUser = yield select(currentUserSelector);
    if (currentUser) {
      yield put(setKickoff());
    }
  } catch (e) {
    console.error('Error when setting login', e);
  }
}

function* logout(): unknown {
  try {
    yield clearPersistedStorage();
  } catch (e) {
    console.error('Error when setting logout', e);
  }
}

export { login, logout };
