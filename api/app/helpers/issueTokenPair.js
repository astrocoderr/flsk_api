import jwtService from '../services/jwt-service';
import { TokenService } from '../modules/tokens/services';

export default async (phone, user) => {
    const token = await jwtService.genToken({ phone });
    const refreshToken = await jwtService.refreshToken();

    await TokenService.add({ phone, token: `${refreshToken}${user._id}` });

    return {
        token,
        refreshToken
    };
}