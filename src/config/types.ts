export interface User {
  name: string;
  email: string;
  password: string;
  errands: Note[];
}

export interface Note {
  id: string;
  description: string;
  detail: string;
}