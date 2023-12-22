import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from 'src/role/role.module';
import { PermissionModule } from 'src/permission/permission.module';
import { ProjectModule } from 'src/project/project.module';
import { ProjectUserModule } from 'src/project-user/project-user.module';

@Module({
  imports: [RoleModule, PermissionModule, forwardRef(() => ProjectModule), ProjectUserModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule]
})

export class UsersModule { }