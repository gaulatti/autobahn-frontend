import { FeatureFlag } from "./feature_flag";

export class UserPreference {
  public language: string;
  public features: FeatureFlag;

  constructor(language: string, features: FeatureFlag) {
    this.language = language;
    this.features = features;
  }
}
