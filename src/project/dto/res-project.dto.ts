import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto } from "./create-project.dto";

export class CreateProjectResult extends PartialType(CreateProjectDto) { }

export class ProjectResult {
    projectType: number;
    customerName: string;
    name: string;
    code: string;
    status: number;
    timeStart: Date;
    timeEnd: Date;
    note: string;
    isAllUserBelongTo: boolean;
    pms: string[];
}