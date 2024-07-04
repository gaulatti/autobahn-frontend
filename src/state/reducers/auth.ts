import { User } from "../../models/user";
import defaultStore, { State } from "../store";

const authReducer = (
  state: State = defaultStore,
  action: { type: string; payload: User }
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: { ...state.auth, currentUser: action.payload, loaded: true },
      };
    case "LOGOUT":
      return {
        ...state,
        auth: { ...state.auth, currentUser: undefined, loaded: false },
      };

    case "SET_CURRENT_USER":
      return {
        ...state,
        auth: { ...state.auth, currentUser: action.payload, loaded: true },
      }
    default:
      return state;
  }
};

export { authReducer };
