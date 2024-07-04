import { useSelector } from "react-redux";
import { getFeatureFlags } from "../state/selectors/featureFlags";
import { FeatureFlag } from '../models/feature_flag';

/**
 * Feature Flags. Used to determine if a specific component
 * or feature is available to be used outside development.
 */
const useFeatureFlags = () => {
  /**
   * Get Feature Flags from Redux.
   *
   * They should have been initialized as part
   * of the kickoff workflow.
   */
  const featureFlags = useSelector(getFeatureFlags);

  /**
   * Expose the value of a specific Feature Flag.
   *
   * If the Feature Flag does not exist, it'll
   * fallback to false.
   */
  const isFeatureEnabled = (key: string): boolean => {
    return !!featureFlags.find((f: FeatureFlag) => f.key === key)?.is_enabled;
  };

  return { isFeatureEnabled };
};

export { useFeatureFlags };
