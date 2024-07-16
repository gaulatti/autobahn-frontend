import { Membership } from './membership';
import { UserPreference } from './user_preference';

export class User {
  public id: string;
  public cognito_id?: string;
  public memberships?: Membership[];
  public name: string;
  public last_name: string;
  public user_preferences?: UserPreference[];
  public deleted_at?: Date;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(id: string, name: string, last_name: string) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
  }
}
