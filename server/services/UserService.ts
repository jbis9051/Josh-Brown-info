import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/User';
import UserToken from '../models/UserToken';

export default class UserService {
    static async getUserFromToken(token: string) {
        if (!token) {
            return null;
        }
        const tokenData = await UserToken.query()
            .findOne({ token })
            .withGraphFetched('user');
        if (!tokenData) {
            return null;
        }
        if (tokenData.token.length !== token.length) {
            return null;
        }
        if (
            !crypto.timingSafeEqual(
                Buffer.from(token),
                Buffer.from(tokenData.token)
            )
        ) {
            return null;
        }
        return tokenData.user;
    }

    static async isValidCredentials(username: string, password: string) {
        const user = await User.query().findOne({ username });
        if (!user) {
            return false;
        }
        return bcrypt.compare(password, user.password);
    }

    static async generateToken(user: User) {
        const token = crypto.randomBytes(64).toString('hex');
        await user.$relatedQuery<UserToken>('tokens').insert({ token });
        return token;
    }
}
