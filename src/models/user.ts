import { Membership } from './membership';
import { UserPreference } from './user_preference';

export type User = {
  id: number;
  sub?: string;
  memberships?: Membership[];
  name: string;
  last_name: string;
  email: string;
  user_preferences?: UserPreference[];
  deleted_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
