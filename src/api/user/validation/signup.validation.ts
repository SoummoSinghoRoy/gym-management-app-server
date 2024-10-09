import validator from 'validator';
import {IValidationFormat} from "../../../Types/general.types";
import { ISignUpRequestBody } from '../../../Types/request.type';
import User from '../../../model/user.model';

export const signupValidation = async (signupReqBody: ISignUpRequestBody): Promise<IValidationFormat> => {
  let error: { [field: string]: string } = {};

  if(!signupReqBody.username) {
    error.username = 'Username required'
  }

  if(!signupReqBody.email) {
    error.email = 'Email required'
  } else if(!validator.isEmail(signupReqBody.email)) {
    error.email = 'Invalid email'
  }

  const existuser: object | null = await User.findOne({email: signupReqBody.email})
  if(existuser) {
    error.email = `Can't use this email`
  }

  if(!signupReqBody.password) {
    error.password = 'Password required'
  } else if(!validator.isLength(signupReqBody.password, {min: 4, max: 8})) {
    error.password = `Password length must be 6 to 8 charecter`
  }

  return {
    isValid: Object.keys(error).length === 0,
    errorResult: error
  }
}