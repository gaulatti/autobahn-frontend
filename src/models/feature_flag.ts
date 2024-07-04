
export class FeatureFlag {
  public key: string;
  public is_enabled: boolean;

  constructor(key: string, is_enabled: boolean) {
    this.key = key;
    this.is_enabled = is_enabled;
  }
}
