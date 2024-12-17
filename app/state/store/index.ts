
import { FeatureFlag } from "../../models/feature_flag";
import { Team } from "../../models/team";
import auth, { AuthStore } from "./auth";
import enums from "./enums";
import featureFlags from "./featureFlags";
import teams from "./teams";

/**
 * Represents the state of the application.
 */
export interface State {
  auth: AuthStore;
  featureFlags: FeatureFlag[];
  teams: Team[];
  enums: Record<string, string[]>;
  kickoffReady: boolean;
}

/**
 * The application state store.
 */
const store: State = {
  auth,
  featureFlags,
  teams,
  enums,
  kickoffReady: false,
};

export default store;
