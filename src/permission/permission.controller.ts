import { Controller, Body, UseGuards, Res, Put } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from 'src/guard/permission.decorator';
import { PERMISSION } from './constant/seed-permission';
import { AuthGuard } from 'src/guard/auth.guard';
import { PermissionGuard } from 'src/guard/permission.guard';
import { Response } from 'express';
import { ChangePermissionDto } from './dto/change-permission';

@Controller('services/app/Role')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Put('ChangePermission')
  @Permission(PERMISSION.Pages_Roles_ChangePermission)
  @UseGuards(AuthGuard, PermissionGuard)
  create(@Body() changePermission: ChangePermissionDto, @Res() response: Response) {
    return this.permissionService.changePermission(changePermission, response);
  }
}