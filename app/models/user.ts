import { Membership } from './membership';
import { UserPreference } from './user_preference';

export type User = {
  id?: string;
  sub: string;
  name: string;
  last_name: string;
  email: string;
  memberships?: Membership[];
  userPreferences?: UserPreference[];
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
