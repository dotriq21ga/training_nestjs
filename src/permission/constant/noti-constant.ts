import { ErrorResponse } from "src/config/constant/err-res-constant";

export const AUTHOR_ERR = ErrorResponse('Current user did not have permissions to access this feature!');
export const CHANGE_PERMISSION_INTERNAL_SERVER_ERROR = ErrorResponse('Change Permission failed', 'Internal Server Error');