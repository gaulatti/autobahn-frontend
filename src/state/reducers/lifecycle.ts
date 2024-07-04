import { User } from "../../models/user";
import defaultStore, { State } from "../store";

const lifecycleReducer = (
  state: State = defaultStore,
  action: { type: string; payload: User }
) => {
  switch (action.type) {
    case "SET_KICKOFF_READY":
      return {
        ...state,
        kickoffReady: true,
      };
    default:
      return state;
  }
};

export { lifecycleReducer };
