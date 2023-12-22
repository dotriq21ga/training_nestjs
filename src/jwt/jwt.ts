import { TOKEN_EXPIRE } from "../config/constant/token-res-constant";
import { JWT_CONSTANTS } from "../config/constant/jwt-constant";

export const CONFIG_JWT = {
    global: true,
    secret: JWT_CONSTANTS.secret,
    signOptions: { expiresIn: TOKEN_EXPIRE },
}