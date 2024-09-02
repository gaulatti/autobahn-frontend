export type Invitation = {
  id: number;
  email: string;
  token: string;
  status: string;
  deleted_at: Date;
  createdAt: Date;
  updatedAt: Date;
};
