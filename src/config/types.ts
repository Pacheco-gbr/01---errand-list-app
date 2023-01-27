export interface User {
  name: string;
  email: string;
  password: string;
  messages: Note[];
}

export interface Note {
  id: string;
  description: string;
  detail: string;
}