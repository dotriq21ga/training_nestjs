import { Controller, Get, Post, Body, Res, UseGuards, Delete, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Response } from 'express';
import { Permission } from 'src/guard/permission.decorator';
import { PERMISSION } from 'src/permission/constant/seed-permission';
import { AuthGuard } from 'src/guard/auth.guard';
import { PermissionGuard } from 'src/guard/permission.guard';

@Controller('services/app/Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post('Create')
  @Permission(PERMISSION.Pages_Projects_Add)
  @UseGuards(AuthGuard, PermissionGuard)
  create(@Body() createProjectDto: CreateProjectDto, @Res() response: Response) {
    return this.projectService.create(createProjectDto, response);
  }

  @Get('GetAll')
  @Permission(PERMISSION.Pages_Projects_ViewList)
  @UseGuards(AuthGuard, PermissionGuard)
  findAll(@Res() response: Response) {
    return this.projectService.getAll(response);
  }

  @Delete('Delete/:id')
  @Permission(PERMISSION.Pages_Projects_Delete)
  @UseGuards(AuthGuard, PermissionGuard)
  delete(@Param('id') id: string, @Res() response: Response) {
    return this.projectService.delete(+id, response);
  }
}
