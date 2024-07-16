import { Membership } from './membership';
import { UserPreference } from './user_preference';

export class User {
  public id: string;
  public sub?: string;
  public memberships?: Membership[];
  public name: string;
  public last_name: string;
  public email: string;
  public user_preferences?: UserPreference[];
  public deleted_at?: Date;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(id: string, sub: string, email: string, name: string, last_name: string) {
    this.id = id;
    this.sub = sub;
    this.email = email;
    this.name = name;
    this.last_name = last_name;
  }
}
