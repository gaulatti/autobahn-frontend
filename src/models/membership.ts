import { Team } from './team';
import { User } from './user';

export type Membership = {
  id: number;
  user: User;
  role: string;
  status: string;
  team: Team;
  deleted_at: Date;
  createdAt: Date;
  updatedAt: Date;
};
