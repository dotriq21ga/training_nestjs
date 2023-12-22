import { Controller, Get, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('TokenAuth/Authenticate')
  login(@Body() loginDto: LoginDto, @Res() response: Response) {
    return this.authService.login(loginDto, response);
  }

  @Get('services/app/Session/GetCurrentLoginInformations')
  @UseGuards(AuthGuard)
  userInfor(@Req() request: Request, @Res() response: Response) {
    return this.authService.userInfor((request as any).user, response);
  }
}
