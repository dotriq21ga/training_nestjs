export class AuthResultDto {
    accessToken: string | null;
    encryptedAccessToken: string | null;
    expireInSeconds: Number;
    userId: Number | null;
}