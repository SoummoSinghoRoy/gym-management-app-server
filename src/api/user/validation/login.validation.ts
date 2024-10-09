import bcrypt from 'bcrypt';
import User from '../../../model/user.model';
import { IValidationFormat } from '../../../Types/general.types';
import { ILoginRequestBody } from '../../../Types/request.type';

const logInValidation = async (loginReqbody: ILoginRequestBody): Promise<IValidationFormat> => {
  let error: { [field: string]: string } = {};

  if (!loginReqbody.email) {
    error.email = 'Email required'
  }

  if (!loginReqbody.password) {
    error.password = 'Password required'
  }

  const validUser: any = await User.findOne({email: loginReqbody.email});
  if (validUser) {
    const match = await bcrypt.compare(loginReqbody.password, validUser.password);
    if (!match) {
      error.password = `Password incorrect`
    }
  } else {
    error.email = `Email not valid`
  }
  return {
    isValid: Object.keys(error).length === 0,
    errorResult: error
  }
}

export default logInValidation;