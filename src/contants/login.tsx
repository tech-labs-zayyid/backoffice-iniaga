export interface UserData {
  _id: string;
  email: string;
  fullname: string;
  phone_number: string;
  role: string;
  status: string;
  verified: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  token: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: UserData;
}
