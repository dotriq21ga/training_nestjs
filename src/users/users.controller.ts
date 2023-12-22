import { Controller, Post, Body, Param, Delete, Put, UseGuards, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { Request, Response } from 'express';
import { IFilterDto } from 'src/config/interfaces/ReqFilterInterface';
import { PERMISSION } from 'src/permission/constant/seed-permission';
import { Permission } from 'src/guard/permission.decorator';
import { PermissionGuard } from 'src/guard/permission.guard';

@Controller('services/app/User')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('Create')
  @Permission(PERMISSION.Pages_Users_Create)
  @UseGuards(AuthGuard, PermissionGuard)
  create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    return this.usersService.create(createUserDto, response);
  }

  @Post('GetAllPaging')
  @Permission(PERMISSION.Pages_Users_ViewList)
  @UseGuards(AuthGuard, PermissionGuard)
  getAllPaging(@Body() filterDto: IFilterDto, @Res() response: Response) {
    return this.usersService.getAllPaging(filterDto, response);
  }

  @Put('Update')
  @Permission(PERMISSION.Pages_Users_Edit)
  @UseGuards(AuthGuard, PermissionGuard)
  update(@Body() updateUserDto: UpdateUserDto, @Res() response: Response) {
    return this.usersService.update(updateUserDto, response);
  }

  @Delete('Delete/:id')
  @Permission(PERMISSION.Pages_Users_Delete)
  @UseGuards(AuthGuard, PermissionGuard)
  remove(@Param('id') id: string, @Req() request: Request, @Res() response: Response) {
    return this.usersService.remove(+id, (request as any).user.id, response);
  }
}
