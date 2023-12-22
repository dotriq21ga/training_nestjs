import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ADMIN } from './constant/seed-user';
import { Role } from 'src/role/entities/role.entity';
import { Response } from 'express';
import { filtering, hashPassword, sorting } from 'src/utils/utils.Helpers';
import { DELETE_INTERNAL_SERVER_ERROR, DELETE_SUCCES, EXISTED_USER, NOT_DELETE_MYSEFT, NOT_EXISTED_USER_DELETE, NOT_EXISTED_USER_UPDATE } from 'src/auth/constant/auth-res-constant';
import { BaseResponse } from 'src/config/constant/res-constant';
import { INTERNAL_SERVER_ERROR } from 'src/config/constant/err-res-constant';
import { IFilterDto } from 'src/config/interfaces/ReqFilterInterface';
import { FilterResult } from 'src/config/interfaces/ResFilterInterface';
import { IUser } from './dto/user-res.dto';
import { ProjectUser } from 'src/project-user/entities/project-user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepsitory: Repository<Role>,
    @InjectRepository(ProjectUser)
    private readonly projectUserRepsitory: Repository<ProjectUser>
  ) {
    this.seedUser();
  }

  async seedUser() {
    const roleCount = this.roleRepsitory.count();
    if (roleCount) {
      const user = await this.userRepository.findOne({ where: { userName: "admin" } });
      if (!user) {
        const newUser = await this.userRepository.create(ADMIN);
        await this.userRepository.save(newUser);
      }
    }
  }

  async getAllPaging(filter: IFilterDto, response: Response) {
    try {
      const order = sorting(filter.sort, filter.sortDirection);
      const filterItemsReq = filtering(filter.filterItems);
      const user = await this.userRepository.findAndCount({
        where: [
          { userName: ILike(`%${filter.searchText}%`), ...filterItemsReq },
          { emailAddress: ILike(`%${filter.searchText}%`), ...filterItemsReq },
          filterItemsReq
        ],
        order: order,
        skip: filter.skipCount,
        take: filter.maxResultCount,
        select: [
          'emailAddress', 'roleId', 'id', 'userName'
        ]
      });
      const result: FilterResult<IUser> = {
        item: user[0],
        totalCount: user[1]
      }
      return response.status(HttpStatus.OK).json({
        ...BaseResponse,
        result: result
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
    }
  }

  async create(userData: CreateUserDto, response: Response) {
    try {
      const hashedPassword = await hashPassword(userData.password);
      userData.password = hashedPassword;
      const duplicateUser = await this.userRepository.findOne({
        where: [
          { emailAddress: userData.emailAddress },
          { userName: userData.userName }
        ],
      });
      if (duplicateUser) {
        return response.status(HttpStatus.BAD_REQUEST).json(EXISTED_USER);
      }
      const newUser = this.userRepository.create(userData);
      await this.userRepository.save(newUser);
      const user: IUser = await this.userRepository.findOne({
        where: { id: newUser.id },
        select: [
          'id', 'emailAddress', 'roleId', 'userName'
        ]
      });
      return response.status(HttpStatus.OK).json({
        ...BaseResponse,
        result: user
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
    }
  }

  async update(userData: UpdateUserDto, response: Response) {
    const { id, ...field_update }: UpdateUserDto = userData;
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) {
        return response.status(HttpStatus.BAD_REQUEST).json(NOT_EXISTED_USER_UPDATE);
      }
      await this.userRepository.update(id, field_update);
      const newUserUpdate: IUser = await this.userRepository.findOne({
        where: { id: id },
        select: [
          'emailAddress', 'id', 'roleId', 'userName'
        ]
      });
      return response.status(HttpStatus.OK).json({
        ...BaseResponse,
        result: newUserUpdate,
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number, currentId: number, response: Response) {
    if (id == currentId) {
      return response.status(HttpStatus.BAD_REQUEST).json(NOT_DELETE_MYSEFT);
    }
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) {
        return response.status(HttpStatus.BAD_REQUEST).json(NOT_EXISTED_USER_DELETE);
      }
      await this.projectUserRepsitory.delete({ userId: id });
      await this.userRepository.delete(id);
      return response.status(HttpStatus.OK).json(DELETE_SUCCES);
    } catch (error) {
      console.error(error);
      return response.status(500).json(DELETE_INTERNAL_SERVER_ERROR);
    }
  }
}
