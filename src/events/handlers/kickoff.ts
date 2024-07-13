import { setEnums } from '../../state/dispatchers/enums';
import { setFeatureFlags } from '../../state/dispatchers/featureFlags';
import { setKickoffReady } from '../../state/dispatchers/lifecycle';
import { put } from 'redux-saga/effects';
import { getKickoff } from '../../graphql/queries/kickoff.graphql';
import { setCurrentUser } from '../../state/dispatchers/auth';
import { setTeams } from '../../state/dispatchers/teams';
import { SagaContext } from '../sagas';
/**
 * Load initial data once the essential information changes.
 *
 * This can be helpful when the user is set (after login).
 */
function* kickoff(context: SagaContext) {
  const { apolloClient: client } = context;
  const {
    data: { kickoff },
  } = yield client?.query({ query: getKickoff });
  const { teams, me, features } = kickoff;
  yield put(setCurrentUser(me));

  /**
   * Set Feature Flags
   */
  yield put(setFeatureFlags(features));

  /**
   * Set Teams
   */
  yield put(setTeams(teams));

  /**
   * Set Enums
   */
  yield put(setEnums([]));

  yield put(setKickoffReady());
}

export { kickoff };
