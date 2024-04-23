import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

function validate(request) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return false;
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    const secret = process.env.JWT_SECRET;

    try {
      const user = this.jwtService.verify(token, { secret });
      user.iat = new Date(user.iat * 1000); // emitido
      user.exp = new Date(user.exp * 1000); // expiracion
      console.log(user);

      user.isAdmin ? (user.roles = ['admin']) : (user.roles = ['user']);

      request.user = user;
      return true;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }
}
