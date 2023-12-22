import { IsEmail } from 'class-validator';
import { ProjectUser } from 'src/project-user/entities/project-user.entity';
import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userName: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    roleId: number;

    @Column({ unique: true })
    @IsEmail()
    emailAddress: string;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @OneToMany(() => ProjectUser, (projectUser) => projectUser.user)
    pms: ProjectUser[];
}