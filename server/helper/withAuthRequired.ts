import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "../services/UserService";
import {User} from "../model/User";

export declare type AuthNextHandler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>, auth: { user: User, token: string }) => void | Promise<void>

export function withAuthRequired(handler: AuthNextHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        function authFailed() {
            res.status(401).end('401 Unauthorized');
        }

        if (!req.headers.authorization?.startsWith("Bearer ")) {
            return authFailed();
        }

        const token = req.headers.authorization.substring(7, req.headers.authorization.length);

        if (!token) {
            return authFailed();
        }

        const user = await UserService.getUserFromToken(token)
        if (!user) {
            return authFailed();
        }
        return handler(req, res, {user, token});
    }
}
