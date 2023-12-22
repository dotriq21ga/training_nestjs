import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { AUTHEN_ERR, INVALID_TOKEN } from 'src/config/constant/token-res-constant';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepsitory: Repository<User>
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            response.status(HttpStatus.BAD_REQUEST).send(AUTHEN_ERR)
            return false
        }
        try {
            const decodedToken = await this.jwtService.verify(token);
            const user = await this.userRepsitory.findOne({
                where: {
                    emailAddress: decodedToken.email
                },
                select: [
                    'emailAddress', 'userName', 'id', 'roleId'
                ]
            });
            (request as any).user = user;
            return true
        } catch (err: any) {
            response.status(HttpStatus.FORBIDDEN).json(INVALID_TOKEN);
            return false
        }
    }
}