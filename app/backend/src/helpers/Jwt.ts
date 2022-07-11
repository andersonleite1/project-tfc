import * as jwt from 'jsonwebtoken';

export default class Jwt {
  static generatorToken(email: string) {
    const jwtConfig = {
      expiresIn: '10d',
    };

    const SECRET = `${process.env.JWT_SECRET}`;

    return jwt.sign({ email }, SECRET, jwtConfig);
  }

  static verify(token: string) {
    const SECRET = `${process.env.JWT_SECRET}`;
    return jwt.verify(token, SECRET);
  }
}
