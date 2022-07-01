export interface Credentials {
  email: string,
  password: string
}

export interface UserPayload {
  id: number;
  name: string;
  roles: string[]
}

export interface UserDetail {
  id: number;
  name: string;
  email: string;
}