import { Membership } from './membership';
import { UserPreference } from './user_preference';

export type User = {
  id: number;
  sub?: string;
  memberships?: Membership[];
  name: string;
  lastName: string;
  email: string;
  user_preferences?: UserPreference[];
  deleted_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
