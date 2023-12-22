import { Project } from "src/project/entities/project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    address: string;

    @OneToMany(() => Project, (project) => project.customerName)
    projects: Project[];
}