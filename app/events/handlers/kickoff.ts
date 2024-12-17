import { put } from 'redux-saga/effects';
import { Team } from '../../models/team';
import { setCurrentUser } from '../../state/dispatchers/auth';
import { setEnums } from '../../state/dispatchers/enums';
import { setFeatureFlags } from '../../state/dispatchers/featureFlags';
import { setKickoffReady } from '../../state/dispatchers/lifecycle';
import { setTeams } from '../../state/dispatchers/teams';
import { pascalToCamelCase } from '../../utils/strings';
import { Method, sendRequest } from '~/clients/api';
/**
 * Load initial data once the essential information changes.
 *
 * This can be helpful when the user is set (after login).
 */

function* kickoff(): Generator<any, void, any> {
  const { me, enums, features } = yield sendRequest(Method.GET);
  /**
   * Set Current User
   */
  yield put(setCurrentUser(me));

  /**
   * Set Feature Flags
   */
  yield put(setFeatureFlags(features));

  /**
   * Set Teams
   */
  const teams = me.memberships.map(({ team }: { team: Team }) => team);
  yield put(setTeams(teams));

  /**
   * Set Enums
   */
  const parsedEnums: Record<string, string[]> = {};
  Object.entries(enums).map(([key, value]) => {
    parsedEnums[pascalToCamelCase(key)] = value as string[];
  });
  yield put(setEnums(parsedEnums));

  /**
   * Set Kickoff Ready
   */
  yield put(setKickoffReady());
}

export { kickoff };
