import {NextApiRequest, NextApiResponse} from "next";
import {AuthNextHandler, withAuthRequired} from "../../../server/helper/withAuthRequired";
import UserToken from "../../../server/models/UserToken";

const logout: AuthNextHandler = async (req: NextApiRequest, res: NextApiResponse, {token}) => {
    await UserToken.query().delete().where({token});
    res.status(200).end();
}
export default withAuthRequired(logout);
