import { Team } from './team';
import { User } from './user';

export type Membership = {
  id: number;
  user: User;
  role: string;
  status: string;
  team: Team;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
