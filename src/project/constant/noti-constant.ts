import { ErrorResponse } from "src/config/constant/err-res-constant";

export const PROJECT_MUST_HAVE_A_PM = ErrorResponse('Project must have a PM!');
export const NOT_EXISTED_USER = ErrorResponse('Create project failed','Not existed user');
export const CREATE_PROJECT_INTERNAL_SERVER_ERROR = ErrorResponse('Create project failed', 'Internal Server Error');
export const NOT_PROJECT_EXISTS = ErrorResponse('Project not already exists');
export const DELETE_PROJECT_INTERNAL_SERVER_ERROR = ErrorResponse('Delete project failed', 'Internal Server Error');