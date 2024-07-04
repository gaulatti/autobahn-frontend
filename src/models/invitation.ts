export class Invitation {
  constructor(id: string, email: string, token: string, status: string, deleted_at: Date, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.email = email;
    this.token = token;
    this.status = status;
    this.deleted_at = deleted_at;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public id: string;
  public email: string;
  public token: string;
  public status: string;
  public deleted_at: Date;
  public createdAt: Date;
  public updatedAt: Date;
}
