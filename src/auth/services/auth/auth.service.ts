import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private _jwtService: JwtService) {}

  async userId(request: Request): Promise<number> {
    const cookie = request.cookies?.jwt;

    const data = await this._jwtService.verifyAsync(cookie);
    console.log({ data });
    return data?.id;
  }
}
