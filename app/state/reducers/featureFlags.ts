import { FeatureFlag } from '../../models/feature_flag';
import { ReduxAction } from '../dispatchers/base';
import defaultStore, { State } from "../store";

const featureFlagsReducer = (state: State = defaultStore, action: ReduxAction) => {
  switch (action.type) {
    case "SET_FEATURE_FLAGS":
      return {
        ...state,
        featureFlags: action.payload as FeatureFlag[],
      };
    default:
      return state;
  }
};

export { featureFlagsReducer };
