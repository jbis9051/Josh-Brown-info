import { NextApiRequest, NextApiResponse } from 'next';
import {
    AuthNextHandler,
    withAuthRequired,
} from '../../../server/helper/withAuthRequired';

const auth: AuthNextHandler = (
    req: NextApiRequest,
    res: NextApiResponse,
    { user }
) => {
    res.status(200).json({
        user: {
            id: user.id,
            username: user.username,
        },
    });
};
export default withAuthRequired(auth);
