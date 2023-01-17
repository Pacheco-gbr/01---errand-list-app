export interface User {
  name: string;
  email: string;
  password: string;
  messages: Message[];
}

export interface Message {
  id: string;
  description: string;
  detail: string;
}