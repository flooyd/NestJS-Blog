import { JWT_SECRET } from '@app/config';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    let roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    roles = roles[0].split(' ');
    let userToken: any | false = getUserToken(request, roles);
    if (!userToken) {
      return false;
    }

    return matchRoles(request.user.roles.split(' '), roles);
  }
}

const matchRoles = (userRoles, guardRoles) => {
  for (const role of guardRoles) {
    if (userRoles.includes(role)) {
      return true;
    }
  }
};

const getUserToken = (request, roles) => {
  if (!request.headers.authorization) {
    return false;
  }

  let token = request.headers.authorization.split(' ')[1];
  let decoded = verify(token, JWT_SECRET);

  if (decoded) {
    request.user = decoded;
    return decoded;
  }

  return false;
};
