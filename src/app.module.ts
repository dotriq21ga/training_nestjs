import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './database/database';
import { CustomerModule } from './customer/customer.module';
import { ProjectModule } from './project/project.module';
import { ProjectUserModule } from './project-user/project-user.module';
import { GuardModule } from './guard/guard.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { JwtModule } from '@nestjs/jwt';
import { CONFIG_JWT } from './jwt/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    JwtModule.register(CONFIG_JWT),
    RoleModule,
    PermissionModule,
    UsersModule,
    AuthModule,
    CustomerModule,
    ProjectModule,
    ProjectUserModule,
    GuardModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }