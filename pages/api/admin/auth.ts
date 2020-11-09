import {NextApiRequest, NextApiResponse} from "next";
import {AuthNextHandler, withAuthRequired} from "../../../server/helper/withAuthRequired";

const auth: AuthNextHandler = (req: NextApiRequest, res: NextApiResponse, {user}) => {
    res.status(200).json({
        user: {
            id: user.id,
            username: user.username,
            type: user.type
        }
    });
}
export default withAuthRequired(auth);
