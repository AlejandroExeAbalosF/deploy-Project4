import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly refletor: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ruteRoles = this.refletor.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(ruteRoles);
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = () => ruteRoles.some((role) => user.roles?.includes(role));
    const validate = user && user.roles && hasRole();
    console.log(validate);
    if (!validate) {
      throw new ForbiddenException(
        'you do not have permissions and you are not allowed to access the route',
      );
    }
    return true;
  }
}
