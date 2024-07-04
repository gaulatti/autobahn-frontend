import { UnknownAction } from '@reduxjs/toolkit';
import defaultStore, { State } from "../store";

const featureFlagsReducer = (state: State = defaultStore, action: UnknownAction) => {
  switch (action.type) {
    case "SET_FEATURE_FLAGS":
      return {
        ...state,
        featureFlags: action.payload,
      };
    default:
      return state;
  }
};

export { featureFlagsReducer };
