export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  error: string | null;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}
