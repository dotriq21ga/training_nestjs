import { IAppResult } from "src/config/interfaces/AppResInterface";

export class IUserInforResult {
    application: IAppResult;
    user: IUser | null;
    tenant: null;
}

export class IUser {
    id: number;
    roleId: number;
    emailAddress: string;
    userName: string;
}