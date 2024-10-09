import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { ILoginRequestBody, ISignUpRequestBody } from "../../Types/request.type";
import { IUserApiResponse } from "../../Types/response.types";
import { signupValidation } from "../validation/user/signup.validation";
import User from "../../model/user.model";
import logInValidation from "../validation/user/login.validation";
import env_variables from "../../config/custom_env_variable";

export const userSignupPostController = async (req: Request, res: Response): Promise<void> => {
  try {
    let { username, email, password }: ISignUpRequestBody = req.body;
    const validation = await signupValidation({ username, email, password });
    if (!validation.isValid) {
      const response: IUserApiResponse = {
        success: false,
        statusCode: 404,
        message: `Validation error occurred`,
        errorDetails: validation.errorResult
      }
      res.json(response);
    } else {
      bcrypt.hash(password, 10, async (err: Error | undefined, hash: string) => {
        if (err) {
          console.log(err);
          const response: IUserApiResponse = {
            success: false,
            statusCode: 500,
            message: 'Internal server error | Get back soon',
          }
          res.json(response);
        } else {
          const registeredUser = new User({
            username,
            email,
            password: hash,
            role: 'admin'
          });
          const user = await registeredUser.save();
          const response: IUserApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Successfully signup',
            data: {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role
            }
          };
          res.json(response);
        }
      })
    }
  } catch (error) {
    console.log(error);
    const response: IUserApiResponse = {
      success: false,
      statusCode: 500,
      message: 'Internal server error | Get back soon',
    }
    res.json(response);
  }
};

export const userLoginPostController = async (req: Request, res: Response): Promise<void> => {
  try {
    let { email, password }: ILoginRequestBody = req.body;
    const validation = await logInValidation({ email, password });
    if (!validation.isValid) {
      const response: IUserApiResponse = {
        success: false,
        statusCode: 404,
        message: `Validation error occurred`,
        errorDetails: validation.errorResult
      }
      res.json(response);
    } else {
      const validUser = await User.findOne({ email });
      if (validUser) {
        jwt.sign({
          id: validUser.id,
          username: validUser.username,
          email: validUser.email,
          role: validUser.role
        }, env_variables.secret_key, { expiresIn: '12h' }, (err, token) => {
          if (err) {
            console.log(err);
            const response: IUserApiResponse = {
              success: false,
              statusCode: 500,
              message: 'Internal server error | Get back soon',
            }
            res.json(response);
          }
          res.cookie('auth-jwtToken', token, { httpOnly: true, expires: new Date(Date.now() + 12 * 3600000) });
          const response: IUserApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Successfully loggedin',
            isAuthenticated: true
          };
          res.json(response);
        })
      } else {
        const response: IUserApiResponse = {
          success: false,
          statusCode: 404,
          message: `Invalid user`
        }
        res.json(response);
      }
    }
  } catch (error) {
    console.log(error);
    const response: IUserApiResponse = {
      success: false,
      statusCode: 500,
      message: 'Internal server error | Get back soon',
    }
    res.json(response);
  }
}