import { IBaseResError } from "../interfaces/BaseResErrInterface";
import { BaseResponse } from "./res-constant";

export const ErrorResponse = (message: string | null = null, details?: any): IBaseResError => {
    return {
        ...BaseResponse,
        error: {
            code: 0,
            message,
            details,
            validationErrors: null,
        },
        success: false,
    };
};

export const INTERNAL_SERVER_ERROR = ErrorResponse('Internal Server Error');