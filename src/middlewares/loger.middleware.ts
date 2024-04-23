import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // console.log('Middleware particular User');
    next();
  }
}

export function logerGlobal(req: Request, res: Response, next: NextFunction) {
  // console.log(`Esta en la ruta ${req.url}`);
  // console.log(`Esta en el metodo ${req.method}`);
  // const fech = new Date();
  // console.log(`Esta en la fecha ${fech}`);
  next();
}
