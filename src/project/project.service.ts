import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Response } from 'express';
import { IUser } from 'src/users/dto/user-res.dto';
import { User } from 'src/users/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { CREATE_PROJECT_INTERNAL_SERVER_ERROR, DELETE_PROJECT_INTERNAL_SERVER_ERROR, NOT_EXISTED_USER, NOT_PROJECT_EXISTS, PROJECT_MUST_HAVE_A_PM } from './constant/noti-constant';
import { ProjectUser } from 'src/project-user/entities/project-user.entity';
import { CreateProjectResult } from './dto/res-project.dto';
import { BaseResponse } from 'src/config/constant/res-constant';
import { INTERNAL_SERVER_ERROR } from 'src/config/constant/err-res-constant';
import { DELETE_SUCCES } from 'src/auth/constant/auth-res-constant';

@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectUser)
    private readonly projectUserRepsitory: Repository<ProjectUser>
  ) { }

  async create(data: CreateProjectDto, response: Response) {
    let userType: boolean = false;
    let isHaveUser: boolean = true;
    const { users, ...projectCreate }: CreateProjectDto = data;
    try {
      await Promise.all(users.map(async user => {
        const checkUser: IUser = await this.userRepository.findOne({ where: { id: user.userId } });
        if (!checkUser) { return isHaveUser = false; };
        if (user.type) { userType = true; };
      }));
      if (!userType) {
        return response.status(HttpStatus.BAD_REQUEST).json(PROJECT_MUST_HAVE_A_PM);
      }
      if (!isHaveUser) {
        return response.status(HttpStatus.BAD_REQUEST).json(NOT_EXISTED_USER);
      }
      const project = await this.projectRepository.create(projectCreate);
      await this.projectRepository.save(project);
      await Promise.all(users.map(async user => {
        const projectUser = await this.projectUserRepsitory.create({ projectId: project.id, userId: user.userId, type: user.type });
        await this.projectUserRepsitory.save(projectUser);
      }));
      const result: CreateProjectResult = {
        users,
        ...projectCreate
      };
      return response.status(HttpStatus.OK).json({
        ...BaseResponse,
        result: result,
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(CREATE_PROJECT_INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(response: Response) {
    try {
      const projects = await this.projectRepository.find({
        relations: {
          customerName: true,
          pms: { user: true }
        },
        where: { pms: { type: 1 } },
      });
      const result = projects.map(project => {
        const pmsNames = project.pms.map(pm => pm.user.userName);
        const customerName = project.customerName.name
        return {
          ...project,
          pms: pmsNames,
          customerName: customerName
        };
      });
      return response.status(HttpStatus.OK).json({
        ...BaseResponse,
        result: result
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number, response: Response) {
    try {
      const project = await this.projectRepository.find({ where: { id: id } });
      if (!project) { return response.status(HttpStatus.BAD_REQUEST).json(NOT_PROJECT_EXISTS); }
      await this.projectUserRepsitory.delete({ projectId: id });
      await this.projectRepository.delete(id);
      return response.status(HttpStatus.OK).json(DELETE_SUCCES);
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(DELETE_PROJECT_INTERNAL_SERVER_ERROR);
    }
  }
}
