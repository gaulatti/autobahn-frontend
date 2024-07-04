import { Membership } from "./membership";
import { UserPreference } from "./user_preference";

export class User {
  public id: string;
  public cognito_id?: string;
  public memberships?: Membership[];
  public username: string;
  public user_preferences?: UserPreference[];
  public deleted_at?: Date;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}
