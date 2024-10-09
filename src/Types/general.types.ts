import { Response, Request, Router } from "express";

export interface EnvVariables {
  db_uri: string;
  db_admin: string;
  db_password: number | string;
  secret_key: string;
};

export interface IRoute {
  path: string;
  handler: Router | ((req: Request, res: Response ) => void);
};

export interface IValidationFormat {
  isValid: boolean;
  errorResult: object;
};


