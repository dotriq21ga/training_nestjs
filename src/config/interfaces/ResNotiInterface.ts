import { IBaseResponse } from "./BaseResInterface";

export interface IBaseResSucces extends IBaseResponse {
    result: {
        message: string | null;
    };
}