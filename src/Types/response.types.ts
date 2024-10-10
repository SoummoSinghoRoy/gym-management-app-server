export interface IApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
};

export interface IUserApiResponse extends IApiResponse {
  errorDetails?: object | string;
  data?: {
    id: any;
    username: string;
    email: string;
    role: string;
  };
  isAuthenticated?: boolean;
}