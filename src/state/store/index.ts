
import { FeatureFlag } from "../../models/feature_flag";
import { Team } from "../../models/team";
import auth, { AuthStore } from "./auth";
import enums from "./enums";
import featureFlags from "./featureFlags";
import teams from "./teams";

export interface State {
  auth: AuthStore;
  featureFlags: FeatureFlag[];
  teams: Team[];
  enums: Record<string, string[]>;
  kickoffReady: boolean;
}

const store: State = {
  auth,
  featureFlags,
  teams,
  enums,
  kickoffReady: false,
};

export default store;
