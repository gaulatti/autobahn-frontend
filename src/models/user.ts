import { Membership } from './membership';
import { UserPreference } from './user_preference';

export type User = {
  id: number;
  sub?: string;
  memberships?: Membership[];
  name: string;
  lastName: string;
  email: string;
  userPreferences?: UserPreference[];
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
