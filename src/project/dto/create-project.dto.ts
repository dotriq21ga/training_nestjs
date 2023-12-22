export class CreateProjectDto {
    projectType: number;
    customerId: number;
    name: string;
    code: string;
    status: number;
    timeStart: string;
    timeEnd: string;
    note: string;
    isAllUserBelongTo: boolean;
    users: UserProject[];
}

export class UserProject {
    userId: number;
    type: number;
}