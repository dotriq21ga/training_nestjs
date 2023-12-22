import { IBaseResSucces } from "../interfaces/ResNotiInterface";
import { BaseResponse } from "./res-constant";

export const SuccesResponse = (message: string | null = null, details?: any): IBaseResSucces => {
    return {
        ...BaseResponse,
        result: {
            message,
        },
    };
};