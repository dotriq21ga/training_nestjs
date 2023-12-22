import { IBaseResponse } from "./BaseResInterface";

export interface IBaseResError extends IBaseResponse {
    error: {
        code: number;
        message: string | null;
        details: string | null;
        validationErrors: any;
    };
}