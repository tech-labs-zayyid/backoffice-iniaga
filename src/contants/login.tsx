export interface UserData {
  _id: string;
  email: string;
  fullname: string;
  status: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  role: string;
  token: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: UserData;
}
