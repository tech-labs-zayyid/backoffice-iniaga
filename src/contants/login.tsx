export interface UserData {
  id: string;
  username: string;
  name: string;
  whatsapp_number: string;
  email: string;
  role: string;
  image_url: string;
  referal_code: string;
  created_at: string;
  created_by: string;
  token_data: {
    token: string;
    refresh_token: string;
  };
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    id: string;
    username: string;
    name: string;
    whatsapp_number: string;
    email: string;
    role: string;
    image_url: string;
    referal_code: string;
    created_at: string;
    created_by: string;
    token_data: {
      token: string;
      refresh_token: string;
    };
  };
}
