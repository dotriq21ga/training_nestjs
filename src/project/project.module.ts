import { Module, forwardRef } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { PermissionModule } from 'src/permission/permission.module';
import { ProjectUserModule } from 'src/project-user/project-user.module';

@Module({
  imports: [forwardRef(() => UsersModule), ProjectUserModule, PermissionModule, TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [TypeOrmModule]
})
export class ProjectModule { }
