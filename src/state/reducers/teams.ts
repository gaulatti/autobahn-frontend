import { Team } from "../../models/team";
import { ReduxAction } from "../dispatchers/base";
import { SetCurrentTeamAction, SetTeamsAction } from "../dispatchers/teams";
import defaultStore, { State } from "../store";
import { Reducer } from "./base";

const setTeamsReducer = (state: State, action: SetTeamsAction): State => {
  return {
    ...state,
    teams: action.payload,
  };
};

const setCurrentTeamReducer = (
  state: State,
  action: SetCurrentTeamAction
): State => {
  const { payload } = action;

  const newTeams: Team[] = [];
  state.teams.forEach((d) =>
    newTeams.push({ ...d, selected: d.id === payload })
  );

  return {
    ...state,
    teams: newTeams,
  };
};

const reducerCatalog: Reducer[] = [
  { action: "SET_TEAMS", handler: setTeamsReducer },
  { action: "SET_CURRENT_TEAM", handler: setCurrentTeamReducer },
];

export const teamsReducer = (
  state: State = defaultStore,
  action: ReduxAction
) => {
  const handler = reducerCatalog.find((i) => i.action === action.type)?.handler;

  return handler ? handler(state, action) : state;
};
