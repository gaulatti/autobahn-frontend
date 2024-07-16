import { put } from 'redux-saga/effects';
import { getKickoff } from '../../graphql/queries/kickoff.graphql';
import { setCurrentUser } from '../../state/dispatchers/auth';
import { setFeatureFlags } from '../../state/dispatchers/featureFlags';
import { setKickoffReady } from '../../state/dispatchers/lifecycle';
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
  const { me, features } = kickoff;
  yield put(setCurrentUser(me));

  /**
   * Set Feature Flags
   */
  yield put(setFeatureFlags(features));

  /**
   * Set Teams
   */
  const mergedTeams = me.memberships.map((membership: any) => {
    const { team, ...rest } = membership;
    return {
      ...team,
      ...rest,
    };
  });

  yield put(setTeams(mergedTeams));

  /**
   * TODO: Set Enums
   * https://github.com/gaulatti/whos-that-girl/issues/16
   */
  // const parsedEnums: Enum[] = [];
  // Object.entries(JSON.parse(enums)).map(([key, value]) => {
  //   parsedEnums.push(new Enum(key, value as string[]));
  // });
  // yield put(setEnums(parsedEnums));

  /**
   * Set Kickoff Ready
   */
  yield put(setKickoffReady());
}

export { kickoff };
