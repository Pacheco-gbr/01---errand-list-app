export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  errands: Errand[];
}

export interface Errand {
  id: string;
  description: string;
  detail: string;
  filed: boolean;
}

export interface ResponseAPI {
  success: boolean;
  message: string;
  data: any;
}

export interface CreateNewUser {
  name: string,
  email: string,
  password: string
}

export interface GetByIdErrandRequest {
  idUser: string,
  idErrand: string
}

export interface CreateErrandRequest {
  idUser: string,
  dataCreateErrand: Omit<Errand, 'id' | 'filed'>
}

export interface UpdateErrandRequest {
  idUser: string;
  idErrand: string;
  dataUpdateErrand: Partial< Omit<Errand, "id">>;
}

export type Users = User[];