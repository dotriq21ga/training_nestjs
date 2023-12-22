import { Module, forwardRef } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { RoleModule } from 'src/role/role.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule), RoleModule, TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [TypeOrmModule]
})

export class PermissionModule { }