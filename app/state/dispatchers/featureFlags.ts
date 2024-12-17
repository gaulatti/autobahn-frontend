import { FeatureFlag } from "../../models/feature_flag";
import { ReduxAction } from "./base";

export interface SetFeatureFlagAction extends ReduxAction {
  payload: FeatureFlag | undefined;
}
const setFeatureFlags = (flags: FeatureFlag[]) => {
  return { type: "SET_FEATURE_FLAGS", payload: flags };
};

export { setFeatureFlags };
