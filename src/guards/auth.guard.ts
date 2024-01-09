import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  declare global {
    namespace Express {
      interface Request {
        user: any;
      }
    }
  }
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Missing token');
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: "secret",
        });
       
        request.user = payload;
      } catch (e) {
        
        throw new UnauthorizedException(e.response || 'Invalid token');
      }
      return true;
    }
  
    private extractTokenFromHeader(req: Request): string | undefined {
        
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"){
            return req.headers.authorization.split(" ")[1]
        }
        
        return undefined
    }
  }