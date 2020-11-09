import {User} from "../model/User";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export class UserService {
    static async getUserFromToken(token: string) {
        if (!token) {
            return null;
        }
        const tokenData = await User.getToken(token);
        if (!tokenData) {
            return null;
        }
        if (tokenData.token.length !== token.length) {
            return null;
        }
        if (!crypto.timingSafeEqual(Buffer.from(token), Buffer.from(tokenData.token))) {
            return null;
        }
        return await User.getUserFromId(tokenData.user_id) as User;
    }

    static async isValidCredentials(username: string, password: string) {
        const userHash = await User.getPassword(username);
        if (!userHash) {
            return false;
        }
        return await bcrypt.compare(password, userHash);
    }

    static getUserFromUsername(username: string) {
        return User.getUserFromUsername(username);
    }

    static async generateToken(user: User) {
        const token = crypto.randomBytes(64).toString('hex');
        await User.insertToken(token, user);
        return token;
    }

    static logout(token: string) {
        return User.removeToken(token);
    }
}
