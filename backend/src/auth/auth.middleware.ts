import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

interface UserRequest extends Request {
  user: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService, private readonly userService: UsersService) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await this.jwt.verify(token);
      const user = await this.userService.findOne(decoded.email);

      if (user) {
        req.user = user;

        return next();
      }

      throw new UnauthorizedException();
    } else {
      throw new BadRequestException('No token found.');
    }
  }
}
