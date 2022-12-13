export interface ResGetRoles {
  data: ResRoles[];
}

export interface ResRoles {
  user_role: string;
  users: User[];
  total: number;
}

export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
  phone: null | string;
  avatar: string;
  role: Role;
  status: string;
  settings: null;
}

export enum Role {
  Adminstrator = "ADMINSTRATOR",
  User = "USER",
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ResGetUsers {
  data: User[];
  meta: Meta;
  message: string;
}
