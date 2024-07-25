import { fetchAuthSession } from 'aws-amplify/auth';
import axios from 'axios';
import { put } from 'redux-saga/effects';
import { Enum } from '../../models/enum';
import { setCurrentUser } from '../../state/dispatchers/auth';
import { setEnums } from '../../state/dispatchers/enums';
import { setKickoffReady } from '../../state/dispatchers/lifecycle';
/**
 * Load initial data once the essential information changes.
 *
 * This can be helpful when the user is set (after login).
 */

const fetchWithAuth = async (url: string) => {
  const { tokens } = await fetchAuthSession();

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${tokens!.idToken}`,
    },
  });
  return response.data;
};
function* kickoff(): Generator<any, void, any> {
  const kickoff = yield fetchWithAuth('https://2tal2o89zh.execute-api.us-east-1.amazonaws.com/prod/');
  const { me, enums } = kickoff;

  yield put(setCurrentUser(me));

  // TODO: Add Teams and Feature Flags
  // /**
  //  * Set Feature Flags
  //  */
  // yield put(setFeatureFlags(features));

  // /**
  //  * Set Teams
  //  */
  // const mergedTeams = me.memberships.map((membership: Membership | { team: Team }) => {
  //   const { team, ...rest } = membership;
  //   return {
  //     ...team,
  //     ...rest,
  //   };
  // });

  // yield put(setTeams(mergedTeams));

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
