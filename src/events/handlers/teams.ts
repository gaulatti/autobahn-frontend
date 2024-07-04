import { put, select } from 'redux-saga/effects';
import { Team } from '../../models/team';
import {
  SetTeamsAction,
  setDefaultTeam as defaultTeamDispatcher,
  setCurrentTeam,
} from '../../state/dispatchers/teams';
import { getTeams } from '../../state/selectors/teams';

/**
 * Set Default Team
 */
function* setTeams({ payload }: SetTeamsAction) {
  const currentTeam = payload.find((t) => t.selected);
  if (!currentTeam) {
    yield put(defaultTeamDispatcher());
  }
}

function* setDefaultTeam({ payload }: SetTeamsAction) {
  const teams: Team[] = yield select(getTeams) || payload;
  const firstTeam = teams.find(Boolean);

  /**
   * If there's a team, let's set it as current
   */
  if (firstTeam) {
    yield put(setCurrentTeam(firstTeam.id));
  }
}

export { setDefaultTeam, setTeams };
