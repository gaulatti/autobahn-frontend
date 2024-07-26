import { put } from 'redux-saga/effects';
import { Method, sendRequest } from '../../clients/api';
import { Enum } from '../../models/enum';
import { Membership } from '../../models/membership';
import { Team } from '../../models/team';
import { setCurrentUser } from '../../state/dispatchers/auth';
import { setEnums } from '../../state/dispatchers/enums';
import { setFeatureFlags } from '../../state/dispatchers/featureFlags';
import { setKickoffReady } from '../../state/dispatchers/lifecycle';
import { setTeams } from '../../state/dispatchers/teams';
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
  const mergedTeams = me.memberships.map((membership: Membership | { team: Team }) => {
    const { team, ...rest } = membership;
    return {
      ...team,
      ...rest,
    };
  });

  yield put(setTeams(mergedTeams));

  /**
   * Set Enums
   */
  const parsedEnums: Enum[] = [];
  Object.entries(enums).map(([key, value]) => {
    parsedEnums.push(new Enum(key, value as string[]));
  });
  yield put(setEnums(parsedEnums));

  /**
   * Set Kickoff Ready
   */
  yield put(setKickoffReady());
}

export { kickoff };
