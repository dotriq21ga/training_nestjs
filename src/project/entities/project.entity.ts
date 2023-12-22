import { Customer } from "src/customer/entities/customer.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PROJECT_TYPE_ENUM } from "../enum";
import { ProjectUser } from "src/project-user/entities/project-user.entity";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    code: string;

    @Column()
    status: number;

    @Column()
    timeStart: string;

    @Column()
    timeEnd: string;

    @Column()
    note: string;

    @Column({ nullable: true })
    customerId: number;

    @Column({
        type: 'enum',
        enum: PROJECT_TYPE_ENUM,
        default: PROJECT_TYPE_ENUM.TM,
    })
    projectType: number;

    @Column()
    isAllUserBelongTo: boolean;

    @ManyToOne(() => Customer, (customer) => customer.projects)
    @JoinColumn({ name: 'customerId' })
    customerName: Customer;

    @OneToMany(() => ProjectUser, (projectUser) => projectUser.project)
    pms: ProjectUser[];
}
