import defaultStore, { State } from "../store";
import { authReducer } from "./auth";
import { teamsReducer } from "./teams";
import { enumsReducer } from "./enums";
import { featureFlagsReducer } from "./featureFlags";
import { lifecycleReducer } from './lifecycle';

const reducers = (state: State = defaultStore, action: any) => {
  const reducerStack = [
    authReducer,
    teamsReducer,
    enumsReducer,
    featureFlagsReducer,
    lifecycleReducer,
  ];

  /**
   * Allowing multiple contextual reducers
   */
  reducerStack.forEach((reducer) => {
    state = reducer(state, action);
  });

  return state;
};

export { reducers };
