export interface IBaseResponse{
    result: object | null;
    success: boolean;
    error: object | null;
    unAuthorizedRequest: boolean;
    targetUrl: object | null;
    __abp: boolean;
}