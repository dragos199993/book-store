import jwt from 'jsonwebtoken';
import { CONFIG } from './config';

export const checkToken = (req: any, res: any, next: any) => {
  let token: any = req.headers['x-access-token']
    // tslint:disable-next-line:no-string-literal
    || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, CONFIG.jwt_encryption, (err: any, decoded: any) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};
