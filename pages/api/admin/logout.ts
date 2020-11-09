import {NextApiRequest, NextApiResponse} from "next";
import {AuthNextHandler, withAuthRequired} from "../../../server/helper/withAuthRequired";
import {UserService} from "../../../server/services/UserService";

const logout: AuthNextHandler = async (req: NextApiRequest, res: NextApiResponse, {token}) => {
    await UserService.logout(token);
    res.status(200).end();
}
export default withAuthRequired(logout);
