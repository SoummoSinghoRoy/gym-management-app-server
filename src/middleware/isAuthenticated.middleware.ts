import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { IUserApiResponse } from '../Types/response.types';

interface ICustomRequest extends Request {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  } | null
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const customReq = req as ICustomRequest;
  const token = req.cookies['auth-jwtToken'];
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded) {
      customReq.user = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role
      }
      next()
    } else {
      const response: IUserApiResponse = {
        success: false,
        statusCode: 403,
        message: 'Forbidden',
        isAuthenticated: false
      }
      res.json(response);
    }
  } else {
    const response: IUserApiResponse = {
      success: false,
      statusCode: 401,
      message: 'UnAuthorized',
      isAuthenticated: false,
    }
    res.json(response);
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const customReq = req as ICustomRequest;
  if(customReq.user?.role === 'admin') {
    next()
  } else {
    const response: IUserApiResponse = {
      success: false,
      statusCode: 401,
      message: 'UnAuthorized access',
      errorDetails: `You must be an admin to perform this action`,
      isAuthenticated: false,
    }
    res.json(response);
  }
}

export {ICustomRequest, isAuthenticated, isAdmin}