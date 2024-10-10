import { Invitation } from './invitation';
import { Membership } from './membership';

export type Team = {
  id: number;
  name: string;
  memberships: Membership[];
  invitations: Invitation[];
  status: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  selected: boolean;
};
