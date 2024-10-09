export interface ISignUpRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface ILoginRequestBody {
  email: string;
  password: string;
}