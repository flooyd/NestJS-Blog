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
    console.log(request.raw.user);
    roles = roles[0].split(' ');
    let userToken: any | undefined = request.raw.user;
    if (!userToken) {
      return false;
    }

    return matchRoles(request.raw.user.roles.split(' '), roles);
  }
}

const matchRoles = (userRoles, guardRoles) => {
  for (const role of guardRoles) {
    if (userRoles.includes(role)) {
      return true;
    }
  }
};
