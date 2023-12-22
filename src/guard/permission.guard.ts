import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { IUser } from 'src/users/dto/user-res.dto';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { AUTHOR_ERR } from 'src/permission/constant/noti-constant';
import { INTERNAL_SERVER_ERROR } from 'src/config/constant/err-res-constant';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(Permission)
        private readonly permissionRepsitory: Repository<Permission>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        const permissionName = this.reflector.get<string>(
            'permission',
            context.getHandler(),
        );
        const user: IUser = (request as any).user;
        try {
            const permission = await this.permissionRepsitory.findOne({
                where: {
                    roleId: user.roleId,
                    name: permissionName,
                    isGranted: true
                }
            })
            if (permission) {
                return true
            }
            response.status(HttpStatus.FORBIDDEN).send(AUTHOR_ERR)
            return false
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
            return false
        }
    }
}

// Phân biệt framework - thư viện
// Tại sao Nest và Angular. Chia project theo module
// CLI (Angular, NestJS)
// Dependency Injection trong Nest và Angular
// Giải thích import, provider, export, controller, exports
// typeorm: Định nghĩa, chức năng+ entities, migrations