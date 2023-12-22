import { Permission } from "src/permission/entities/permission.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    displayName: string;

    @Column()
    description: string;

    @Column()
    normalizedName: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];

    @OneToMany(() => Permission, (Permission) => Permission.role)
    permissions: Permission[];
}
