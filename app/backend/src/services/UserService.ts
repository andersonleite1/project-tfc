import * as bcrypt from 'bcryptjs';
import Jwt from '../helpers/Jwt';
import UserModel from '../database/models/UserModel';

import { ILogin } from '../interfaces/ILogin';
import { IJwtToken } from '../interfaces/IJwtToken';
import { ITokenData } from '../interfaces/ITokenData';
import { IUserRole } from '../interfaces/IUserRole';

class UserService {
  static async login({ email, password }: ILogin): Promise<IJwtToken | undefined> {
    const userData = await UserModel.findOne({ where: { email } });

    if (!userData) return undefined;

    const passwordValid = await bcrypt.compareSync(password, userData.password);

    if (!passwordValid) return undefined;

    const token = Jwt.generatorToken(email);
    return { token };
  }

  static async loginValidate(token: string): Promise<IUserRole | undefined> {
    try {
      const { email } = Jwt.verify(token) as ITokenData;
      const userData = await UserModel.findOne({ where: { email } });

      if (!userData) return undefined;

      const { role } = userData;
      return { role };
    } catch (err) {
      if (err instanceof Error && err.name.includes('Token')) {
        return undefined;
      }
    }
  }
}

export default UserService;
