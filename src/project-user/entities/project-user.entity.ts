import { Project } from "src/project/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    projectId: number;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => User, (user) => user.pms)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Project, (project) => project.pms)
    @JoinColumn({ name: 'projectId' })
    project: Project;

    @Column()
    type: number;
}