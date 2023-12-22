import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: true })
    isGranted: boolean;

    @Column({ nullable: true })
    roleId: number;

    @ManyToOne(() => Role, (role) => role.permissions)
    @JoinColumn({ name: 'roleId' })
    role: Role;
}
