import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '@app/config';
import { verify } from 'jsonwebtoken';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req, res: Response, next: NextFunction) {
    let token = getUserToken(req);
    if (token) {
      req.user = token;
    }
    next();
  }
}

const getUserToken = (request) => {
  console.log('getting token');
  if (!request.headers.authorization) {
    return false;
  }

  console.log(request.headers.authorization);
  let token = request.headers.authorization.split(' ')[1];
  let decoded = verify(token, JWT_SECRET);

  if (decoded) {
    console.log('decoded');
    request.user = decoded;
    return decoded;
  }

  return false;
};
