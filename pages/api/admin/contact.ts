import {NextApiRequest, NextApiResponse} from "next";
import {withAuthRequired} from "../../../server/helper/withAuthRequired";
import {ContactMessageService} from "../../../server/services/ContactMessageService";
import Message from "../../../server/models/Message";

async function contact(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(404).end('404 Not Found');
        return;
    }
    res.status(200).json({contactMessages: await Message.query()});
}

export default withAuthRequired(contact)
