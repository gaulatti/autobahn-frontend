import { Team } from './team';
import { User } from './user';

export class Membership {
  public id: string;
  public user: User;
  public role: string;
  public status: string;
  public team: Team;
  public deleted_at: Date;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: string,
    user: User,
    role: string,
    status: string,
    team: Team,
    deleted_at: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.user = user;
    this.role = role;
    this.status = status;
    this.team = team;
    this.deleted_at = deleted_at;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
