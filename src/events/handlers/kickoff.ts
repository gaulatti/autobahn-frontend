// import { kickoffQuery } from "../../graphql/queries/kickoff.graphql"
// import { store } from "../../state"
import { setKickoffReady } from '../../state/dispatchers/lifecycle';
import { setEnums } from '../../state/dispatchers/enums';
import { setFeatureFlags } from '../../state/dispatchers/featureFlags';

import { kickoffQuery } from '../../graphql/queries/kickoff.graphql';
import { setTeams } from '../../state/dispatchers/teams';
import { SagaContext } from '../sagas';
import { put } from 'redux-saga/effects';
import { setCurrentUser } from '../../state/dispatchers/auth';
/**
 * Load initial data once the essential information changes.
 *
 * This can be helpful when:
 * 1. The user is set (after login).
 */
function* kickoff(context: SagaContext) {
  const { apolloClient: client } = context;
  const {
    data: {
      kickoff,
      invitationStatuses,
      roles,
      socialMediaTypes,
      statuses,
    },
  } = yield client?.query({ query: kickoffQuery });
  const { teams, me } = kickoff;
  yield put(setCurrentUser(me))

  /**
   * Set Feature Flags
   */
  yield put(setFeatureFlags([]));
  // store.dispatch(setFeatureFlags(kickoff.features))

  /**
   * Set Teams
   */
  yield put(setTeams(teams));

  /**
   * Set Enums
   */
  yield put(
    setEnums([
      invitationStatuses,
      roles,
      socialMediaTypes,
      statuses,
    ])
  );

  yield put(setKickoffReady());
}

export { kickoff };
