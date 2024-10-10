export type Invitation = {
  id: number;
  email: string;
  token: string;
  status: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
