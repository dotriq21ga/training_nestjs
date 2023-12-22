import { Injectable, HttpStatus } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PERMISSION } from './constant/seed-permission';
import { Role } from 'src/role/entities/role.entity';
import { ChangePermissionDto } from './dto/change-permission';
import { Response, response } from 'express';
import { BaseResponse } from 'src/config/constant/res-constant';
import { PermissionResultDto } from './dto/res-permission';
import { CHANGE_PERMISSION_INTERNAL_SERVER_ERROR } from './constant/noti-constant';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(Role)
        private readonly roleRepsitory: Repository<Role>
    ) {
        this.seedPermission();
    }

    async seedPermission() {
        const roleCount = this.roleRepsitory.count();
        if (roleCount) {
            const permissionCount = await this.permissionRepository.count();
            if (!permissionCount) {
                const permissions = Object.values(PERMISSION);
                const permissionCreate = [];
                permissions.forEach(async (permission) => {
                    return permissionCreate.push({
                        name: permission,
                        roleId: 1,
                    })
                })
                const data = await this.permissionRepository.create(permissionCreate);
                await this.permissionRepository.save(data);
            }
        }
    }

    public changePermission = async (data: ChangePermissionDto, res: Response) => {
        const { id, grantedPermissions }: ChangePermissionDto = data;
        try {
            await this.permissionRepository.update({ roleId: id }, { isGranted: false });
            await Promise.all(grantedPermissions.map(async grantedPermission => {
                const permission = await this.permissionRepository.findOne({ where: { roleId: id, name: grantedPermission } });
                if (permission) {
                    return await this.permissionRepository.update({ roleId: id, name: grantedPermission }, { isGranted: true },);
                }
                const permissionCreate = await this.permissionRepository.create({ name: grantedPermission, roleId: id, isGranted: true });
                return await this.permissionRepository.save(permissionCreate);
            }));
            const result: PermissionResultDto = {
                id: id,
                grantedPermissions: grantedPermissions,
            }
            return res.status(HttpStatus.OK).json({
                ...BaseResponse,
                result: result
            });
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(CHANGE_PERMISSION_INTERNAL_SERVER_ERROR);
        }
    }
}
