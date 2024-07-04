import { Invitation } from './invitation';
import { Membership } from './membership';

export class Team {
  public id: string;
  public name: string;
  public memberships: Membership[];
  public invitations: Invitation[];
  public status: string;
  public deleted_at: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public selected: boolean = false;

  constructor(
    id: string,
    name: string,
    memberships: Membership[],
    invitations: Invitation[],
    status: string,
    deleted_at: Date,
    createdAt: Date,
    updatedAt: Date,
    selected: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.memberships = memberships;
    this.invitations = invitations;
    this.status = status;
    this.deleted_at = deleted_at;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.selected = selected;
  }
}
