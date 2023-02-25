export interface User {
  name: string;
  email: string;
  password: string;
  errands: Errand[];
}

export interface Errand {
  id: string;
  description: string;
  detail: string;
}