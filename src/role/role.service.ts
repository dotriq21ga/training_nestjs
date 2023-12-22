import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { ROLES_SEED } from './constant/seed-role';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { this.seedRole(); }

  async seedRole() {
    const count = await this.roleRepository.count();
    if (!count) {
      const newRole = await this.roleRepository.create(ROLES_SEED);
      await this.roleRepository.save(newRole);
    }
  }
}
