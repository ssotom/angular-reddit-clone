export class LoginRequest {
  username: string;
  password: string;
}

export class LoginResponse {
  token: string;
  refreshToken: string;
  username: string;
  expiresAt: Date;
}
  