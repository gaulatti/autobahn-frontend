import { ReduxAction } from '../dispatchers/base';
import defaultStore, { State } from '../store';
import { authReducer } from './auth';
import { enumsReducer } from './enums';
import { featureFlagsReducer } from './featureFlags';
import { lifecycleReducer } from './lifecycle';
import { teamsReducer } from './teams';

const reducers = (state: State = defaultStore, action: ReduxAction) => {
  const reducerStack = [authReducer, teamsReducer, enumsReducer, featureFlagsReducer, lifecycleReducer];

  /**
   * Allowing multiple contextual reducers
   */
  reducerStack.forEach((reducer) => {
    state = reducer(state, action)!;
  });

  return state;
};

export { reducers };
