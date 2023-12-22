import { ErrorResponse } from "src/config/constant/err-res-constant";
import { SuccesResponse } from "src/config/constant/noti-res-constant";
import { AuthResultDto } from "../dto/auth-res.dto";
import { TOKEN_EXPIRE } from "src/config/constant/token-res-constant";
import { APP } from "src/config/constant/app-res-constant";
import { IUserInforResult } from "src/users/dto/user-res.dto";

export const TOKEN_INFOR_RESULT: AuthResultDto = {
   accessToken: null,
   encryptedAccessToken: '',
   expireInSeconds: TOKEN_EXPIRE,
   userId: null,
};

export const USER_INFOR_RESULT: IUserInforResult = {
   application: APP,
   user: null,
   tenant: null,
}

export const AUTH_INTERNAL_SERVER_ERROR = ErrorResponse('Login failed!', 'Internal Server Error');
export const LOGIN_FAILED = ErrorResponse('Login failed!', 'Invalid user name or password');
export const EXISTED_USER = ErrorResponse('userName or emailAddres is already taken.');
export const NOT_EXISTED_USER_UPDATE = ErrorResponse('Update user failed', 'Not existed user');
export const NOT_DELETE_MYSEFT = ErrorResponse('Delete user failed', 'Can not delete myself');
export const NOT_EXISTED_USER_DELETE = ErrorResponse('Delete user failed', 'Not existed user');
export const DELETE_INTERNAL_SERVER_ERROR = ErrorResponse('Delete failed!', 'Internal Server Error');
export const DELETE_SUCCES = SuccesResponse('Delete successfully');