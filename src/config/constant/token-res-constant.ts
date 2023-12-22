import { ErrorResponse } from "./err-res-constant";

export const TOKEN_EXPIRE = 8640000;
export const AUTHEN_ERR = ErrorResponse('Current user did not login to the application!');
export const INVALID_TOKEN = ErrorResponse('Your request is not valid!', 'Invalid token');